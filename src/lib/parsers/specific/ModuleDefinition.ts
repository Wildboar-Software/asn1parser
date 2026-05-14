import {
  assert,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import * as parserFor from '../specific/index.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ModuleDefinition ::=
 *     ModuleIdentifier
 *     DEFINITIONS
 *     EncodingReferenceDefault
 *     TagDefault
 *     ExtensionDefault
 *     "::="
 *     BEGIN
 *     ModuleBody
 *     EncodingControlSections
 *     END`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ModuleDefinition, [
      parserFor.ModuleIdentifier,
      literal(ProductionType._DEFINITIONS),
      parserFor.EncodingReferenceDefault,
      parserFor.TagDefault,
      parserFor.ExtensionDefault,
      literal(ProductionType.assignment),
      literal(ProductionType._BEGIN),
      parserFor.ModuleBody,
      parserFor.EncodingControlSections,
      assert(
        literal(ProductionType._END),
        whitespace,
        '21F3E741-4D4D-4692-956F-19713967C48E'
      ),
    ])
);
