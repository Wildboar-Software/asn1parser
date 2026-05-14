import { literal, sequenceOf } from '../generic/index.mjs';
import ProductionType from '../../ProductionType.mjs';

export default sequenceOf(ProductionType.valuefieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.valuereference),
]);
