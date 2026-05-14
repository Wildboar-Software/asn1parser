import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAndException ::= "..." | "..." ExceptionSpec`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExtensionAndException, [
      parserFor.ellipsis,
      parserFor.ExceptionSpec, // ExceptionSpec is optional anyway.
    ])
);
