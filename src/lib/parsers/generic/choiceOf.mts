import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary Produce a `Parser` that attempts multiple alternatives.
 * @description
 * This parser factory takes multiple alternatives, and attempts to parse them,
 * one by one, until one succeeds. The alternative parsers will be attempted in
 * the order that they were received in the `alts` array. If no matches occur,
 * the generated parser returns an error to its parent. If parsing succeeds, the
 * succeeding parser's CST will be returned if `containingType` is not set,
 * otherwise, another `Production` having type `containingType` will subsume the
 * CST produced by the succeeding alternative.
 *
 * @param {Parser[]} alts The parsers to attempt.
 * @param {ProductionType} containingType The type of the `Production` that will
 *  subsume the parsed alternative.
 * @returns {Parser} A `Parser` that will attempt all of the alternatives and
 *  return the first successful alternative.
 * @function
 */
export const choiceOf = function (
  alts: Parser[],
  containingType?: ProductionType
): Parser {
  return new Parser(
    () => `${containingType || alts.map((p) => p.name()).join(',')} Choice`,
    (state: ParseContext): ParseContext => {
      const currentloc = state.tokens[state.index].location;
      for (const labeledParser of alts) {
        const result = labeledParser.execute(state);
        if (!result.error) {
          // This logs as "info" level, because knowing which paths
          // the Parser takes is especially valuable, with the
          // exception of whitespace.
          if (containingType === ProductionType.whitespace) {
            state.log.debug(
              `Read ${containingType || alts.map((p) => p.name()).join(',')} ` +
                `alternative ${labeledParser.name()}.`
            );
          } else {
            state.log.info(
              `Read ${containingType || alts.map((p) => p.name()).join(',')} ` +
                `alternative ${labeledParser.name()}.`
            );
          }

          return {
            ...result,
            // For some reason, you have to use `state`'s currentType...
            currentType: state.currentType,
            cst: containingType
              ? new Production(containingType || result.cst.type, [result.cst])
              : result.cst,
          };
        }
      }

      // None of the alternatives matched. Return an error.
      const cst = new Production(containingType || ProductionType.empty, [], {
        ...currentloc,
        endIndex: currentloc.startIndex,
      });
      return {
        ...state,
        error: true,
        cst,
      };
    }
  );
}
;
export default choiceOf;
