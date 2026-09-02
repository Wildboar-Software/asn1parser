import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import LogLevel from '../../LogLevel.mjs';
import { failParse } from './tokenPeek.mjs';

/**
 * @summary One parser, or several tried in order, for a single token type.
 */
export type TokenParserMapping = Parser | readonly Parser[];

/**
 * @summary Map from the current token type to the alternative(s) that can match.
 * @description
 * A `Map` is used instead of an object so lookups do not depend on hidden
 * class / own-property semantics, and so the key set is obvious at the call
 * site. These tables are tiny (tens of keys); lookup cost is not the win.
 * Skipping the unmapped alternatives is.
 *
 * If the current token is not in the table and `fallback` is omitted, this
 * fails immediately. That is the same outcome as `choiceOf` exhausting every
 * alternative. Callers must list every FIRST token of every alternative they
 * intend to accept. A missing entry is a silent false negative, so prefer to
 * pass `fallback` when the FIRST set is not closed (for example when a later
 * production such as `ReferencedValue` should still run).
 */
export type TokenParserTable = Map<string, TokenParserMapping>;

function parsersFor(mapped: TokenParserMapping): readonly Parser[] {
  if (mapped instanceof Parser) {
    return [mapped];
  }
  return mapped;
}

/**
 * @summary Build a dispatch table with string token-type keys.
 * @description
 * `new Map([...])` infers the key from the first entry's `ProductionType`
 * member enum, which is too narrow. This helper keeps keys as `string`.
 */
export function tokenParserTable(
  entries: readonly (readonly [string, TokenParserMapping])[]
): TokenParserTable {
  return new Map(entries);
}

/**
 * @summary `choiceOf` that looks at the current token instead of trying every alt.
 * @description
 * Alternatives whose FIRST set cannot include the current token are not
 * executed. Success wrapping matches `choiceOf`: the child's CST is subsumed
 * by `containingType` when that is set, and `currentType` is taken from the
 * incoming state.
 *
 * @param table Token type to parser (or ordered parsers that share a FIRST).
 * @param containingType Optional parent production type.
 * @param fallback Tried when the current token has no table entry. Omit to
 *  fail closed on unknown tokens.
 * @returns A parser that dispatches on the current token type.
 */
export const dispatchOnToken = function (
  table: TokenParserTable,
  containingType?: ProductionType,
  fallback?: TokenParserMapping
): Parser {
  return new Parser(
    () => `${containingType || 'TokenDispatch'}`,
    (state: ParseContext): ParseContext => {
      const tokenType: string = state.tokens[state.index].type;
      const mapped: TokenParserMapping | undefined =
        table.get(tokenType) ?? fallback;
      if (mapped === undefined) {
        return failParse(state, containingType || ProductionType.empty);
      }
      const alts: readonly Parser[] = parsersFor(mapped);
      for (const labeledParser of alts) {
        const result = labeledParser.execute(state);
        if (!result.error) {
          if (
            containingType !== ProductionType.whitespace &&
            state.log.level <= LogLevel.info
          ) {
            state.log.info(
              `Read ${containingType || 'TokenDispatch'} alternative ${labeledParser.name()}.`
            );
          }
          return {
            ...result,
            currentType: state.currentType,
            cst: containingType
              ? new Production(containingType, [result.cst])
              : result.cst,
          };
        }
      }
      return failParse(state, containingType || ProductionType.empty);
    }
  );
};

export default dispatchOnToken;
