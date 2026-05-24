import { aliasFor, literal } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
// import { strict as assert } from 'assert';

const literalShibboleths: Set<ProductionType> = new Set<ProductionType>([
  ProductionType.period, // Then it is actually the objectclassreference in an ObjectClassFieldType.
]);

/**
 * @summary Intelligent `Literal` parser that avoids some mistakes
 * @description
 * This `Literal` parser intelligently avoids mistakes such intepreting an
 * `ObjectClassFieldType` as a `Literal`, or interpreting an
 * `objectclassreference` or all-caps `typereference` as a `Literal`.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * Literal ::= word | ","
 * ```
 *
 * @constant {Parser}
 */
export const Literal: Parser = new Parser(
  (): string => 'Literal',
  (state: ParseContext): ParseContext => {
    const literalComma: ParseContext = literal(
      ProductionType.comma,
      ProductionType.Literal
    ).execute(state);
    if (!literalComma.error) {
      return literalComma;
    }

    const literalWord: ParseContext = aliasFor(
      ProductionType.Literal,
      parserFor.word
    ).execute(state);
    if (literalWord.error) {
      return literalWord; // If a word cannot be read, there is no reason for further validation.
    }

    const currentToken = state.tokens[state.index];
    const currentTokenText: string = state.text.slice(
      currentToken.location.startIndex,
      currentToken.location.endIndex
    );
    // assert(!currentTokenText.endsWith(','), currentTokenText);
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

    /**
     * If the next non-whitespace indicates that the token is actually part
     * of something other than a literal word, return an error.
     */
    if (literalShibboleths.has(nextNonWhitespace.type)) {
      return {
        ...state,
        error: true,
      };
    }

    /**
     * If it does not appear in any known defined syntaxes, and if it is
     * already used as an identifier for an assignment, assume it is not
     * a literal.
     */
    if (
      !state.definedSyntaxTokens.has(currentTokenText) &&
      state.discoveredIdentifiers.has(currentTokenText)
    ) {
      return {
        ...state,
        error: true,
      };
    }

    return literalWord;
  }
);
export default Literal;
