import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import * as parserFor from './index.js';

/**
 * `PropertySettings ::= SETTINGS simplestring`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PropertySettings, [
      literal(ProductionType._SETTINGS),
      assert(
        parserFor.simplestring,
        anything,
        '6193B0DE-3542-45F0-B67F-979F198048F0'
      ),
    ])
);
