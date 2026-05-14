import ProductionType from '../../ProductionType.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';

/**
 * @summary Parse any whitespace.
 * @description
 * This parser parses any number of any whitespace characters recognized by the
 * ASN.1 specifications.
 *
 * Even though whitespace is really just a repeatable choice between
 * `newlineWhitespace` and `nonNewlineWhitespace`, I implemented a custom
 * parser for it, just because whitespace is so common that any performance
 * gains will be monumental. In one file, using this custom parser cut down
 * parsing time by 20%.
 *
 * @constant
 */
export default new Parser(
  (): string => 'whitespace',
  (state: ParseContext): ParseContext => {
    let endIndex: number = state.index;
    let currentToken: Production = state.tokens[endIndex];
    while (
      endIndex < state.tokens.length &&
      (currentToken.type === ProductionType.newlineWhitespace ||
        currentToken.type === ProductionType.nonNewlineWhitespace)
    ) {
      currentToken = state.tokens[++endIndex];
    }
    if (endIndex > state.index) {
      // Tokens were read.
      return {
        ...state,
        error: undefined,
        index: endIndex,
        cst: new Production(
          ProductionType.whitespace,
          state.tokens.slice(state.index, endIndex)
        ),
      };
    } else {
      return {
        ...state,
        error: true,
        cst: new Production(ProductionType.whitespace, []),
      };
    }
  }
);
