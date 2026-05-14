import type GrokedThing from '../../interfaces/GrokedThing.js';
import type NamedNumber from '../NamedNumber.js';

export default interface IntegerType extends GrokedThing {
  namedNumberList?: NamedNumber[];
  selfContained?: boolean;
}
