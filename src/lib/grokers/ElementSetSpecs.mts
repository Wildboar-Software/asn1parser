import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType, { NonTerminalProductionType } from '../ProductionType.js';
import grokElementSetSpec from '../grokers/ElementSetSpec.js';
import type ElementSetSpecs from '../constructs/ElementSetSpecs.js';

// ElementSetSpecs ::=
//     RootElementSetSpec
//      | RootElementSetSpec "," "..."
//      | RootElementSetSpec "," "..." "," AdditionalElementSetSpec

// RootElementSetSpec ::= ElementSetSpec
// AdditionalElementSetSpec ::= ElementSetSpec

export default function grok(
  cst: Production,
  ctx: GrokContext
): ElementSetSpecs<string> {
  const RootElementSetSpec: Production = cst.children[0];
  const AdditionalElementSetSpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.AdditionalElementSetSpec
  );
  const explicitlyExtensible = Boolean(
    cst.children.find(
      (child: Production): boolean => child.type === ProductionType.ellipsis
    )
  );
  return {
    productionType: NonTerminalProductionType.ElementSetSpecs,
    rootElementSetSpec: grokElementSetSpec(RootElementSetSpec.children[0], ctx),
    additionalElementSetSpec: AdditionalElementSetSpec
      ? grokElementSetSpec(AdditionalElementSetSpec.children[0], ctx)
      : undefined,
    explicitlyExtensible,
  };
}
