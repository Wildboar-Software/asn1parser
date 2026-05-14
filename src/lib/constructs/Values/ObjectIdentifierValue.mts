import type GrokedThing from '../../interfaces/GrokedThing.js';
import type DefinedValue from '../Defined.js';
import { type ObjIdComponents } from '../ObjIdComponents.js';

// ObjectIdentifierValue ::=
//     "{" ObjIdComponentsList "}"
// 	| "{" DefinedValue ObjIdComponentsList "}"

// ObjIdComponentsList ::=
//     ObjIdComponents
// 	| ObjIdComponents ObjIdComponentsList

// ObjIdComponents ::=
//     NameForm
// 	| NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

// NameForm ::=
//     identifier

// NumberForm ::=
//     number
// 	| DefinedValue

// NameAndNumberForm ::=
//     identifier "(" NumberForm ")"

// 32.6 The "DefinedValue" of "ObjIdComponents" shall be of type relative object identifier, and shall identify an
// ordered set of arcs from some starting node in the object identifier tree to some later node in the object
// identifier tree. The starting node is identified by the earlier "ObjIdComponents"s, and later "ObjIdComponents"s
// (if any) identify arcs from the later node. The starting node is required to be neither the root, nor a node
// immediately beneath the root.
// NOTE – A relative object identifier value has to be associated with a specific object identifier value so as to
// unambiguously identify an object. Object identifier values are required (see 32.11) to have at least two components.
// This is why there is a restriction on the starting node.

export default interface ObjectIdentifierValue extends GrokedThing {
  prefix?: DefinedValue;
  components: ObjIdComponents[];
}
