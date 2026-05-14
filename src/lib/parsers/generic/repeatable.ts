import Parser from '../../Parser.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';

/**
 * @summary Parse any number of something.
 * @description
 * This parser repeatedly parses the input with the `Parser` supplied as the
 * `parser` argument. When no more parsing can be done with this parser, the
 * `Parser` produced by this function returns all of the parsed repetitions
 * as children of a parent `Production` whose type is `containingType`.
 * @param {ProductionType} containingType The type of the parent `Production`
 *  that will subsume all repetitions as children.
 * @param {Parser} parser The `Parser` that will parse individual repetitions.
 * @returns {Parser} The `Parser` that will parse any number of items parseable
 *  by the `parser`.
 */
export default function (
  containingType: ProductionType,
  parser: Parser
): Parser {
  return new Parser(
    () => `${containingType} / Repeatable ${parser.name()}`,
    (state: ParseContext): ParseContext => {
      const children: Production[] = [];
      state.log.debug(`Repeatable index: ${state.index}.`);
      let result = state;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        result = parser.execute(result);
        if (result.error) {
          break;
        }
        state.log.debug(`Read optional repeatable ${result.cst.type}.`);
        children.push(result.cst);
        if (result.index >= result.tokens.length) {
          break;
        }
      }
      return {
        ...state,
        error: children.length === 0,
        index: result.index,
        cst: new Production(containingType, children),
      };
    }
  );
}
