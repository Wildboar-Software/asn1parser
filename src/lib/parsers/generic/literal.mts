import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import LogLevel from '../../LogLevel.mjs';

/**
 * @summary Backs the children of every empty `Production` reported by a failed
 *  `literal`.
 * @description
 * Nothing in this library mutates a `Production`'s `children`, so a single
 * array can be shared by all of them instead of allocating one per failure.
 * @constant {Production[]}
 */
const NO_CHILDREN: Production[] = [];

/**
 * @summary Only parse a token having a specific type.
 * @description
 * This parser factory produces a parser that parses a single token, and only
 * succeeds if that token has exactly the type indicated by `ProductionType`.
 *
 * This is the most frequently executed parser in the library: every alternative
 * that `choiceOf` tries bottoms out in one of these, and most of those attempts
 * fail. Both returned states are therefore written out field by field rather
 * than with `{...state}`, so that every `ParseContext` leaving this parser has
 * one identical shape, and the failure path reuses a shared empty child array
 * and the token's cached zero-width location instead of allocating both on
 * every attempt.
 *
 * The returned state must remain a fresh object, because callers such as
 * `optional()` mutate it.
 * @param {ProductionType} type Succeed if the next token has this type.
 * @param {ProductionType} containingType If success, enclose the token in this
 *  type.
 * @returns {Parser} A `Parser` that will succeed only if the next token has the
 *  type indicated by `type` and optionally encloses it in a parent production.
 * @function
 */
export const literal = function (
  type: ProductionType,
  containingType?: ProductionType
): Parser {
  const emptyType: ProductionType = containingType ?? type;
  return new Parser(
    () => containingType || type,
    (state: ParseContext): ParseContext => {
      const currentToken: Production = state.tokens[state.index];
      if (currentToken.type === type) {
        if (state.log.level <= LogLevel.debug) {
          state.log.debug(`Read single literal ${type} successfully.`);
        }
        return {
          log: state.log,
          text: state.text,
          tokens: state.tokens,
          error: state.error,
          cst: containingType
            ? new Production(containingType, [currentToken])
            : currentToken,
          index: state.index + 1,
          syntaxErrors: state.syntaxErrors,
          discoveredIdentifiers: state.discoveredIdentifiers,
          callbackMap: state.callbackMap,
          definedSyntaxTokens: state.definedSyntaxTokens,
          definedEnumItems: state.definedEnumItems,
          currentType: state.currentType,
          justParsedPluralLiteral: state.justParsedPluralLiteral,
          memo: state.memo,
        };
      }
      if (state.log.level <= LogLevel.debug) {
        state.log.debug(
          `Expected ProductionType ${type}, but got ${currentToken.type}.`
        );
      }
      return {
        log: state.log,
        text: state.text,
        tokens: state.tokens,
        error: true,
        cst: new Production(emptyType, NO_CHILDREN, currentToken.emptyLocation),
        index: state.index,
        syntaxErrors: state.syntaxErrors,
        discoveredIdentifiers: state.discoveredIdentifiers,
        callbackMap: state.callbackMap,
        definedSyntaxTokens: state.definedSyntaxTokens,
        definedEnumItems: state.definedEnumItems,
        currentType: state.currentType,
        justParsedPluralLiteral: state.justParsedPluralLiteral,
        memo: state.memo,
      };
    }
  );
}
;
export default literal;
