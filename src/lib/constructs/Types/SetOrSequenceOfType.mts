import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';
import type NamedType from  '../NamedType.mjs';
import type Constraint from '../Constraint.mjs';

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
