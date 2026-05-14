import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type NamedNumber from '../NamedNumber.mjs';

export default interface IntegerType extends GrokedThing {
  namedNumberList?: NamedNumber[];
  selfContained?: boolean;
}
