import { literal, sequenceOf } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const valuefieldreference: Parser = sequenceOf(ProductionType.valuefieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.valuereference),
]);
export default valuefieldreference;
