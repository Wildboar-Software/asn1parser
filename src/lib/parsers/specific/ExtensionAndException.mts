import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
