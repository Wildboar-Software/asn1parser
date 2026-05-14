import ProductionType from '../../ProductionType.mjs';
import { literal, sequenceOf } from '../generic/index.mjs';

export default sequenceOf(ProductionType.objectfieldreference, [
  literal(ProductionType.ampersand),
  literal(ProductionType.identifier, ProductionType.objectreference),
]);
