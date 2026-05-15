import type Defined from '../../../Defined.mjs';
import type GrokedThing from '../../../../interfaces/GrokedThing.mjs';

/**
 * A constraint that uses one field of a structured type to relate to an
 * information object and require information from that object to apply to
 * another field, such as a type. This is used to ensure that, for example,
 * if using a given error code from an error object, that same object's
 * error parameter type is to be used as the type of another component in
 * that structured type.
 *
 * ```bnf
 * ComponentRelationConstraint ::= "{" DefinedObjectSet "}" "{" AtNotation "," + "}"
 * 
 * AtNotation ::=
 *     "@" ComponentIdList
 *     | "@." Level ComponentIdList
 * 
 * Level ::=
 *     "." Level
 *     | empty
 * 
 * ComponentIdList ::= identifier "." +
 * ```
 */
export default interface ComponentRelationConstraint extends GrokedThing {
  /**
   * The set of information objects from which fields may be drawn.
   */
  definedObjectSet: Defined;
  /**
   * This is a bit complex. I'd rather just keep it a string[] for now.
   */
  atNotation: string[];
}
