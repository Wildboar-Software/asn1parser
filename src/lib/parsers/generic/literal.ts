import Parser from '../../Parser.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';

/**
 * @summary Only parse a token having a specific type.
 * @description
 * This parser factory produces a parser that parses a single token, and only
 * succeeds if that token has exactly the type indicated by `ProductionType`.
 * @param {ProductionType} type Succeed if the next token has this type.
 * @param {ProductionType} containingType If success, enclose the token in this
 *  type.
 * @returns {Parser} A `Parser` that will succeed only if the next token has the
 *  type indicated by `type` and optionally encloses it in a parent production.
 * @function
 */
export default function (
  type: ProductionType,
  containingType?: ProductionType
): Parser {
  return new Parser(
    () => `${containingType || type} Literal`,
    (state: ParseContext): ParseContext => {
      const currentToken: Production = state.tokens[state.index];
      if (currentToken.type === type) {
        state.log.debug(`Read single literal ${type} successfully.`);
        return {
          ...state,
          index: state.index + 1,
          cst: containingType
            ? new Production(containingType, [currentToken])
            : currentToken,
        };
      } else {
        state.log.debug(
          `Expected ProductionType ${type}, but got ${currentToken.type}.`
        );
        return {
          ...state,
          error: true,
          cst: new Production(containingType ?? type, [], {
            ...currentToken.location,
            endIndex: currentToken.location.startIndex,
          }),
        };
      }
    }
  );
}
