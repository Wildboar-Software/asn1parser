import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type ObjectIdentifierValue from '../../constructs/Values/ObjectIdentifierValue.mjs';
import grokDefinedValue from '../Defined.mjs';
import grokObjIdComponents from '../ObjIdComponents.mjs';
import { type ObjIdComponents } from '../../constructs/ObjIdComponents.mjs';
import type NameAndOrNumberForm from '../../constructs/NameAndOrNumberForm.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1SemanticError from '../../errors/ASN1SemanticError.mjs';
import { recognizedRootArcNamesForNumber } from '../../builtinRootArcNamesRootNumber.mjs';

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

function quotedNames(names: readonly string[]): string {
  const quoted = names.map((name: string): string => `'${name}'`);
  if (quoted.length <= 1) {
    return quoted[0] ?? '';
  }
  if (quoted.length === 2) {
    return `${quoted[0]} and ${quoted[1]}`;
  }
  return `${quoted.slice(0, -1).join(', ')}, and ${quoted[quoted.length - 1]}`;
}

/**
 * ITU-T X.680 clauses 32.3–32.5: a `NameAndNumberForm` on the root arc may
 * only use a name from ITU-T X.660 Annex A, and the number must be the one
 * assigned to that name. A single `NameAndNumberForm` whose number is 0, 1,
 * or 2 is otherwise a legal root arc, so `{ prefix(2) }` is accepted unless
 * the name is checked. A bare `NameForm` is left alone: `{ id-ad }` is used
 * in real modules to cite another object identifier without adding arcs.
 */
function unrecognizedRootArcMessage(
  name: string,
  number: number,
  singleNameAndNumber: boolean,
): string {
  const recognized = recognizedRootArcNamesForNumber(number);
  const expected =
    recognized.length === 0
      ? `Root arcs are numbered 0 (${quotedNames(recognizedRootArcNamesForNumber(0))}), 1 (${quotedNames(recognizedRootArcNamesForNumber(1))}), and 2 (${quotedNames(recognizedRootArcNamesForNumber(2))}).`
      : `The recognized ${recognized.length === 1 ? 'name' : 'names'} for root arc ${number} ${recognized.length === 1 ? 'is' : 'are'} ${quotedNames(recognized)}.`;
  const prefixHint = singleNameAndNumber
    ? ` If '${name}' is an object identifier prefix, write '{ ${name} ${number} }' instead of '{ ${name}(${number}) }'.`
    : '';
  return `Object identifier root arc '${name}' (${number}) is not a recognized root arc name. ${expected}${prefixHint}`;
}

function isNamedRootArc(
  component: ObjIdComponents,
): component is NameAndOrNumberForm & { name: string } {
  return 'name' in component && typeof component.name === 'string';
}

function assertRecognizedRootArcName(
  components: ObjIdComponents[],
  ctx: GrokContext,
): void {
  const first = components[0];
  if (!first) {
    return;
  }
  if (!isNamedRootArc(first) || typeof first.number !== 'number') {
    return;
  }
  if (recognizedRootArcNamesForNumber(first.number).includes(first.name)) {
    return;
  }
  throw new ASN1SemanticError(
    unrecognizedRootArcMessage(
      first.name,
      first.number,
      components.length === 1,
    ),
    first.production,
    ctx.currentModule.name,
  );
}

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
  if (!prefix) {
    assertRecognizedRootArcName(components, ctx);
  }
  return {
    text: ctx.text.slice(cst.location.startIndex, cst.location.endIndex),
    prefix,
    components,
    production: cst,
  };
}
