import { literal, recursiveParser, sequenceOf } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
