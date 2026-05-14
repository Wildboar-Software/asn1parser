import sequenceOf from './sequenceOf.js';
import Parser from '../../Parser.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';

/**
 * @summary Efficiently parse sequences with optional trailing components.
 * @description
 * This parser factory generates a parser that does not re-parse sequences that
 * it has already read successfully.
 *
 * For this parser to succeed, it must read the first sequence correctly, but
 * the trailing ones are optional.
 *
 * @param {ProductionType} containingType The type of the `Production` by which
 *  all of the component CSTs will be subsumed as children.
 * @param {Parser[][]} parserSets An array of arrays of parsers. The first must
 *  be parsed successfully for this parser to succeed, but the trailing
 *  sequences are optional.
 * @returns A Parser that will not re-parse sequences that have already been
 *  parsed successfully.
 */
export default function (
  containingType: ProductionType,
  ...parserSets: Parser[][]
): Parser {
  return new Parser(
    () => `${containingType} Sequence`,
    (state: ParseContext): ParseContext => {
      let previousState = state;
      const results: ParseContext[] = [];
      const sequenceParsers = parserSets.map((ps) =>
        sequenceOf(containingType, ps)
      );
      if (sequenceParsers.length === 0) {
        throw new Error();
      }

      // At least the first one must parse successfully.
      const result = sequenceParsers[0].execute(previousState);
      if (result.error) {
        return {
          ...state,
          error: true,
        };
      }
      results.push(result);
      previousState = result;

      // The rest can fail.
      for (const sp of sequenceParsers.slice(1)) {
        const result = sp.execute(previousState);
        if (result.error) {
          break;
        }
        results.push(result);
        previousState = result;
      }

      return {
        ...previousState,
        cst: new Production(
          containingType,
          results.flatMap((r) => r.cst.children)
        ),
      };
    }
  );
}
