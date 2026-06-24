import type GrokContext from './interfaces/GrokContext.mjs';
import Production from './Production.mjs';
import ProductionType from './ProductionType.mjs';
import type Module from './constructs/Module.mjs';
import grokModule from './grokers/Module.mjs';
import consoleLogger from './loggers/console.mjs';
import parse from './parse.mjs';
import type ParseContext from './interfaces/ParseContext.mjs';
import ASN1ParserExpectationError from './errors/ASN1ParserExpectationError.mjs';

/**
 * @summary Convert an ASN.1 concrete syntax tree into abstract syntax trees.
 * @description
 * Converts the concrete syntax tree (CST) generated from parsing ASN.1 strings
 * into abstract syntax trees (ASTs) for each module found.
 *
 * If no argument is supplied for `parseResult`, `text` will be lexed and
 * parsed. If `parseResult` _is_ supplied, this function will not take care of
 * the lexing and parsing. Making this optional is for convenience, since you
 * usually don't have an interest in _just_ the lexing or parsing outputs by
 * themselves, but only as an input to this function.
 *
 * @param {string} text The raw text of the ASN.1 module(s).
 * @param {ParseContext} parseResult The output of parsing.
 * @returns An AST for each module parsed.
 * @function
 */
export default function grok(
  text: string,
  parseResult?: ParseContext
): Module[] {
  const parsed: ParseContext =
    parseResult ??
    (() => {
      const parseResult_ = parse(text);
      if (
        parseResult_.error ||
        Object.keys(parseResult_.syntaxErrors).length > 0
      ) {
        throw new Error(Object.keys(parseResult_.syntaxErrors).join(', '));
      }
      return parseResult_;
    })();
  const ctx: GrokContext = {
    log: consoleLogger,
    text,
    currentModule: {},
    enumItems: parsed.definedEnumItems,
  };
  let ret!: Module[];
  switch (parsed.cst.type) {
    case ProductionType.document: {
      const modules = parsed.cst.children.find(
        (child: Production): boolean => child.type === ProductionType.modules
      );
      if (!modules) {
        throw new ASN1ParserExpectationError(
          'Could not find modules Production in document Production.',
          parsed.cst,
        );
      }
      ret = modules.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.ModuleDefinition
        )
        .map((child: Production): Module => grokModule(child, ctx));
      break;
    }
    case ProductionType.modules: {
      ret = parsed.cst.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.ModuleDefinition
        )
        .map((child: Production): Module => grokModule(child, ctx));
      break;
    }
    case ProductionType.ModuleDefinition: {
      ret = [grokModule(parsed.cst, ctx)];
      break;
    }
    default: {
      throw new ASN1ParserExpectationError(
        `Could not grok AST starting whose root is a '${parsed.cst.type}'.`,
        parsed.cst,
      );
    }
  }

  return ret;
}
