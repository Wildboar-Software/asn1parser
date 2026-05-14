import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary Define a grammatical production as a simple alias to another.
 * @description
 * Whenever a grammatical production is a simple alias for another grammatical
 * production--in other words, when the production has the form `A := B`--this
 * generic parser may be used to generate a parser that will wrap the CST of
 * the aliased `parser` with a Production having the type indicated by
 * `containingType`.
 * @param {ProductionType} containingType The type to assign to the parent
 *  `Production` that will "swallow" the CST of the aliased `parser`.
 * @param {Parser} parser The parser to be aliased by this one.
 * @returns {Parser} The parser that will generate a CST whose root node has
 *  type `containingType` and whose root node's only child is `parser`'s CST.
 * @function
 */
export default function (
  containingType: ProductionType,
  parser: Parser
): Parser {
  return new Parser(
    () => `Alias Of ${containingType} (${parser.name()})`,
    (state: ParseContext): ParseContext => {
      const result = parser.execute(state);
      if (result.error) {
        return {
          ...state,
          error: true,
          cst: new Production(containingType),
        };
      }
      state.log.debug(`Read alias ${containingType}.`);
      return {
        ...state,
        error: undefined,
        tokens: state.tokens,
        index: result.index,
        cst: new Production(containingType, [result.cst]),
      };
    }
  );
}
