import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Type } from '../Type.js';
import type NamedType from  '../NamedType.js';
import type Constraint from '../Constraint.js';

// SequenceOfType ::=
// 	SEQUENCE OF Type | SEQUENCE OF NamedType

// SetOfType ::=
//     SET OF Type
// 	| SET OF NamedType

export default interface SetOrSequenceOfType extends GrokedThing {
  of: Type | NamedType;

  /**
   * `SizeConstraint ::= SIZE Constraint`
   *
   * A `number` if a single fixed number is the `Constraint`.
   * An array of two `number`s if a range is the `Constraint`.
   * A `Constraint` in all other cases.
   */
  size?: number | [number | undefined, number | undefined] | Constraint;
}
