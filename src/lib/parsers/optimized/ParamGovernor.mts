import { choiceOf, recursiveParser, literal, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';

const shibboleths: Set<ProductionType> = new Set<ProductionType>([
  ProductionType.curlyClosing,
  ProductionType.comma,
  ProductionType.colon,
]);

/**
 * @summary `ParamGovernor` parser that discerns between an object class and
 *  type identifier.
 * @description
 * This parser intelligently parses a `ParamGovernor` by determining if the
 * `Governor` is an object class identifier. Without this, the parser would
 * read object class identifiers in the `Governor` as a defined type.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * ParamGovernor ::= Governor | DummyGovernor
 * ```
 *
 * @constant {Parser}
 */
export const ParamGovernor: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        /**
         * This custom parser checks if the next production is an object class
         * reference. To do this, it must check that the next non-whitespace
         * token is either a closing curly bracket, a comma, or a colon; if the next
         * token is something else, then we probably are not done reading a
         * different production, such as an object class field type.
         */
        new Parser(
          () => 'DummyGovernor using an objectclassreference',
          (state: ParseContext): ParseContext => {
            const ocr = aliasFor(
              ProductionType.DummyGovernor,
              aliasFor(
                ProductionType.DummyReference,
                aliasFor(
                  ProductionType.Reference,
                  literal(ProductionType.objectclassreference)
                )
              )
            ).execute(state);
            if (ocr.error) {
              return ocr;
            }

            const nextNonWhitespace = state.tokens
              .slice(state.index + 1)
              .find(
                (token) =>
                  token.type !== ProductionType.newlineWhitespace &&
                  token.type !== ProductionType.nonNewlineWhitespace
              );
            // I don't know where this would even happen, but whatever.
            if (!nextNonWhitespace) {
              return {
                ...state,
                error: true,
              };
            }

            if (!shibboleths.has(nextNonWhitespace.type)) {
              return {
                ...state,
                error: true,
              };
            }

            // If no info can be found, assume it is an object class.
            const identifier = ocr.text.slice(
              ocr.cst.location.startIndex,
              ocr.cst.location.endIndex
            );
            const assignmentType = state.discoveredIdentifiers.get(identifier);
            switch (assignmentType) {
              case AssignmentType.ObjectClassAssignment: {
                return ocr;
              }
              case AssignmentType.TypeAssignment: {
                return {
                  ...state,
                  error: true,
                };
              }
              default: {
                return ocr;
              }
            }
          }
        ),

        parserFor.Governor,
        parserFor.DummyGovernor,
      ],
      ProductionType.ParamGovernor
    )
);
export default ParamGovernor;
