import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType, { NonTerminalProductionType } from '../ProductionType.js';
import type ObjectSetSpec from '../constructs/ObjectSetSpec.js';
import grokElementSetSpec from './ElementSetSpec_ObjectSet.js';

// ObjectSet ::=
//     "{" ObjectSetSpec "}"

// ObjectSetSpec ::=
//     RootElementSetSpec
//     | RootElementSetSpec "," "..."
//     | "..."
//     | "..." "," AdditionalElementSetSpec
//     | RootElementSetSpec "," "..." "," AdditionalElementSetSpec

export default function grok(cst: Production | undefined, ctx: GrokContext): ObjectSetSpec {
    if (!cst) {
        return {
            productionType: NonTerminalProductionType.ObjectSetSpec,
            rootElementSetSpec: undefined,
            additionalElementSetSpec: undefined,
            explicitlyExtensible: false,
        };
    }
  const RootElementSetSpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.RootElementSetSpec
  );
  const AdditionalElementSetSpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.AdditionalElementSetSpec
  );
  const extensible: boolean = cst.children.some(
    (child: Production): boolean => child.type === ProductionType.ellipsis
  );
  return {
    productionType: NonTerminalProductionType.ObjectSetSpec,
    rootElementSetSpec: RootElementSetSpec
      ? grokElementSetSpec(RootElementSetSpec.children[0], ctx)
      : undefined,
    additionalElementSetSpec: AdditionalElementSetSpec
      ? grokElementSetSpec(AdditionalElementSetSpec.children[0], ctx)
      : undefined,
    explicitlyExtensible: extensible,
  };
}
