import Parser from '../../Parser.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';

/**
 * @summary A `Parser` that will parse one token of any type.
 * @constant
 */
export default new Parser(
  () => 'Anything',
  (state: ParseContext): ParseContext => {
    const currentToken: Production = state.tokens[state.index];
    state.log.debug(
      `Read single ${currentToken.type} (anything) successfully.`
    );
    return {
      ...state,
      index: state.index + 1,
      cst: currentToken,
    };
  }
);
