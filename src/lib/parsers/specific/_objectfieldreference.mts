import ProductionType from '../../ProductionType.mjs';
import type Parser from '../../Parser.mjs';
import { literal, sequenceOf } from '../generic/index.mjs';

export const objectfieldreference: Parser = sequenceOf(ProductionType.objectfieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.objectreference),
]);
export default objectfieldreference;
