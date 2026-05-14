import { literal, sequenceOf } from '../generic/index.js';
import ProductionType from '../../ProductionType.js';

export default sequenceOf(ProductionType.valuefieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.valuereference),
]);
