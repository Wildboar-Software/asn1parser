import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ActualParameter } from './ActualParameter.mjs';
import AssignmentType from './AssignmentType.mjs';

/**
 * A reference to an assignment elsewhere. This can be a reference to a type, 
 * a value, an object class, an object, etc. Any assignment. This is used to
 * represent a `DefinedObject`, `DefinedType`, and so on.
 * 
 * Here is the definition of `DefinedObject` from the ASN.1 ABNF:
 * 
 * ```bnf
 * DefinedObject ::= ExternalObjectReference | objectreference
 * ExternalObjectReference ::= modulereference "." objectreference
 * ```
 */
export default interface Defined extends GrokedThing {
  /** The module in which this identifier is defined. */
  module?: string;
  /** The identifier of the assignment. */
  reference: string;
  /** The parameters of the assignment, if it is parameterized. */
  parameters?: ActualParameter[];
  /** The type of assignment to which this refers. */
  assignmentType?: AssignmentType;

  /**
   * `undefined` if this does not refer to a parameter, otherwise, the index
   * of the parameter this refers to in the `ParameterList`.
   */
  parameterIndex?: number;

  /**
   * This is the same as `module`, except that `module` is meant to denote
   * what was present in the original defined thing, whereas `computedModule`
   * refers to the module to which it belongs if it is not explicitly stated.
   *
   * This distinction exists so that compiled references can correctly refer
   * to intra-modular references.
   */
  computedModule: string;
}
