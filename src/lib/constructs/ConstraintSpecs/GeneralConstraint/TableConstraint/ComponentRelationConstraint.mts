import type Defined from '../../../Defined.mjs';
import type GrokedThing from '../../../../interfaces/GrokedThing.mjs';

export default interface ComponentRelationConstraint extends GrokedThing {
  definedObjectSet: Defined;
  /**
   * This is a bit complex. I'd rather just keep it a string[] for now.
   */
  atNotation: string[];
}
