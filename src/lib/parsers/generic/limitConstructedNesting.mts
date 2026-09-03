import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import recursiveParser from './recursiveParser.mjs';

/**
 * Maximum nesting of inline `SEQUENCE` / `SET` / `CHOICE` types and values.
 * Deeper nesting is rejected so the parser cannot overflow the call stack.
 */
export const MAX_CONSTRUCTED_NESTING_DEPTH = 50;

/**
 * Process-wide nesting counter. `literal()` copies `ParseContext` field by
 * field and would drop a value stored on the context, so depth cannot live
 * there. Parsing is synchronous, so this is not shared across overlapping
 * `parse()` calls.
 */
let constructedNestingDepth = 0;

/**
 * @summary Fail when constructed ASN.1 types or values nest too deeply.
 * @description
 * Inline `SEQUENCE { SEQUENCE { … } }`, `SET`, `CHOICE`, `SEQUENCE OF`,
 * `SET OF`, and the corresponding values recurse through `Type` / `Value`.
 * Without a bound, a hostile or malformed module can overflow the stack.
 *
 * The getter is the same delayed construction `recursiveParser` uses, so
 * circular `parserFor.*` bindings are not captured as `undefined` at module
 * load. The inner parser is packrat-memoized; this wrapper is not, so the
 * depth check always runs before a memo hit.
 *
 * @param {() => Parser} parserGetter The `SEQUENCE` / `SET` / `CHOICE` type
 *  or value parser, constructed on first use.
 * @returns {Parser} A parser that enforces {@link MAX_CONSTRUCTED_NESTING_DEPTH}.
 * @function
 */
export const limitConstructedNesting = function (
  parserGetter: () => Parser
): Parser {
  const inner = recursiveParser(parserGetter);
  return new Parser(
    () => inner.name(),
    (state: ParseContext): ParseContext => {
      if (constructedNestingDepth >= MAX_CONSTRUCTED_NESTING_DEPTH) {
        const token = state.tokens[state.index];
        const key = token?.location.startIndex ?? state.index;
        if (!(key in state.syntaxErrors)) {
          state.syntaxErrors[key] = new ASN1SyntaxError(
            token ?? state.cst,
            `Constructed SEQUENCE, SET, or CHOICE nesting exceeds ${MAX_CONSTRUCTED_NESTING_DEPTH} levels.`
          );
        }
        return {
          ...state,
          error: true,
        };
      }
      constructedNestingDepth++;
      try {
        return inner.execute(state);
      } finally {
        constructedNestingDepth--;
      }
    }
  );
};

export default limitConstructedNesting;
