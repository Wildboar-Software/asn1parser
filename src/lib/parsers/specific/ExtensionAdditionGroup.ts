import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAdditionGroup ::= "[[" VersionNumber ComponentTypeList "]]"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExtensionAdditionGroup, [
      literal(ProductionType.squareOpening),
      assert(
        literal(ProductionType.squareOpening),
        literal(ProductionType.squareClosing),
        '8AA7962E-B87D-4B00-8B68-99C35EFFB86A'
      ),
      parserFor.VersionNumber,
      assert(
        parserFor.ComponentTypeList,
        literal(ProductionType.squareClosing),
        '8AA7962E-B87D-4B00-8B68-99C35EFFB86A'
      ),
      assert(
        literal(ProductionType.squareClosing),
        literal(ProductionType.squareClosing),
        'BAC2B8B1-71F3-4238-8410-039F985C43BD'
      ),
      assert(
        literal(ProductionType.squareClosing),
        anything,
        '7A7428FA-D7E5-4DB0-AEE1-E542D717B0BC'
      ),
    ])
);
