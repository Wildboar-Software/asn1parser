import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';

/**
 * @summary Efficient parser for a `typereference`
 * @description
 * A `typereference` could also be an `objectclassreference`, because
 * `objectclassreference` is a subset of `typereference` in that it only
 * contains capital letters.
 * @constant {Parser}
 */
export default new Parser(
  (): string => 'typereference',
  (state: ParseContext): ParseContext => {
    const currentToken: Production = state.tokens[state.index];
    if (
      currentToken.type === ProductionType.typereference ||
      currentToken.type === ProductionType.objectclassreference
    ) {
      return {
        ...state,
        index: state.index + 1,
        cst: currentToken,
      };
    } else {
      return {
        ...state,
        error: true,
      };
    }
  }
);
