import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import type ObjectIdentifierValue from '../../constructs/Values/ObjectIdentifierValue.js';
import grokDefinedValue from '../Defined.js';
import grokObjIdComponents from '../ObjIdComponents.js';
import { type ObjIdComponents } from '../../constructs/ObjIdComponents.js';
import ProductionType from '../../ProductionType.js';

/**
 * NOTE: Notice that DefinedValue is an optional suffix of ObjectIdentifierValue,
 * but also an alternative ObjIdComponents. ASN.1 is dumb.
 */
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

export default function grokObjectIdentifierValue(
  cst: Production,
  ctx: GrokContext
): ObjectIdentifierValue {
  const usefulSubproductions: Production[] = cst.children
    .slice(1, -1) // Remove the curly brackets
    .filter((child): boolean => child.type !== ProductionType.whitespace);
  const prefix =
    usefulSubproductions[0].type === ProductionType.DefinedValue
      ? grokDefinedValue(usefulSubproductions[0], ctx)
      : undefined;
  const ObjIdComponentsList: Production =
    usefulSubproductions[usefulSubproductions.length - 1];
  const components: ObjIdComponents[] = ObjIdComponentsList.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.ObjIdComponents
    )
    .map((oic: Production): ObjIdComponents => grokObjIdComponents(oic, ctx));
  return {
    text: ctx.text.slice(cst.location.startIndex, cst.location.endIndex),
    prefix,
    components,
  };
}
