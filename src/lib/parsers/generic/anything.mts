import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';

/**
 * @summary A `Parser` that will parse one token of any type.
 * @constant
 */
export const anything: Parser = new Parser(
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
export default anything;
