import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type DefinedValue from '../Defined.mjs';
import { type ObjIdComponents } from '../ObjIdComponents.mjs';

/**
 * An ASN.1 `OBJECT IDENTIFIER` value, which may be absolute or defined
 * relative to a prefix. Object identifier values are required to have at least
 * two arcs.
 * 
 * ```bnf
 * ObjectIdentifierValue ::=
 *     "{" ObjIdComponentsList "}"
 *   | "{" DefinedValue ObjIdComponentsList "}"
 * 
 * ObjIdComponentsList ::=
 *     ObjIdComponents
 *   | ObjIdComponents ObjIdComponentsList
 * 
 * ObjIdComponents ::=
 *     NameForm
 *   | NumberForm
 *   | NameAndNumberForm
 *   | DefinedValue
 * 
 * NameForm ::= identifier
 * NumberForm ::= number | DefinedValue
 * NameAndNumberForm ::= identifier "(" NumberForm ")"
 * ```
 */
export default interface ObjectIdentifierValue extends GrokedThing {

  /**
   * A reference to the object identifier that forms the prefix of this
   * object identifier value, if any. If present, the arcs listed in
   * `components` are relative to this prefix; otherwise, the arcs start
   * with a root arc.
   */
  prefix?: DefinedValue;

  /**
   * The arcs of the object identifier value.
   */
  components: ObjIdComponents[];
}
