import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType, { NonTerminalProductionType } from '../ProductionType.mjs';
import type ObjectSetSpec from '../constructs/ObjectSetSpec.mjs';
import grokElementSetSpec from './ElementSetSpec_ObjectSet.mjs';

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
