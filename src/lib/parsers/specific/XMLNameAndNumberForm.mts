import { literal, recursiveParser, sequenceOf } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLNameAndNumberForm ::= identifier & "(" & XMLNumberForm & ")"`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.XMLNameAndNumberForm, [
      literal(ProductionType.identifier),
      literal(ProductionType.parenthesisOpening),
      parserFor.XMLNumberForm,
      literal(ProductionType.parenthesisClosing),
    ])
);
