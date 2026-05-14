import ProductionType from '../../ProductionType.js';
import { literal, sequenceOf } from '../generic/index.js';

export default sequenceOf(ProductionType.objectfieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.objectreference),
]);
