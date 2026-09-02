import sequenceOf from './sequenceOf.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1ParserExpectationError from '../../errors/ASN1ParserExpectationError.mjs';

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
export const recyclingSequenceOf = function (
  containingType: ProductionType,
  ...parserSets: Parser[][]
): Parser {
  const sequenceParsers = parserSets.map((ps) =>
    sequenceOf(containingType, ps)
  );
  if (sequenceParsers.length === 0) {
    throw new ASN1ParserExpectationError(
      'No parsers passed into recyclingSequenceOf'
    );
  }

  return new Parser(
    () => `${containingType} Sequence`,
    (state: ParseContext): ParseContext => {
      let previousState = state;
      const results: ParseContext[] = [];

      // At least the first one must parse successfully.
      const first = sequenceParsers[0].execute(previousState);
      if (first.error) {
        return {
          ...state,
          error: true,
        };
      }
      results.push(first);
      previousState = first;

      // The rest can fail.
      for (let i = 1; i < sequenceParsers.length; i++) {
        const result = sequenceParsers[i].execute(previousState);
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
};

export default recyclingSequenceOf;
