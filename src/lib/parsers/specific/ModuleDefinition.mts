import {
  assert,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import * as parserFor from '../specific/index.mjs';
import ProductionType from '../../ProductionType.mjs';

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
export const ModuleDefinition: Parser = recursiveParser(
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
export default ModuleDefinition;
