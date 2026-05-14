import type GrokContext from '../interfaces/GrokContext.mjs';
import grokObjectSetSpec from './ObjectSetSpec.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ObjectSet } from '../constructs/ObjectSet.mjs';

// ObjectSet ::= "{" ObjectSetSpec "}"

export default function grok(cst: Production, ctx: GrokContext): ObjectSet {
  return grokObjectSetSpec(
    cst.children.find(
      (c: Production): boolean => c.type === ProductionType.ObjectSetSpec
    ),
    ctx
  );
}
