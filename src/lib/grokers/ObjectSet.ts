import type GrokContext from '../interfaces/GrokContext.js';
import grokObjectSetSpec from './ObjectSetSpec.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ObjectSet } from '../constructs/ObjectSet.js';

// ObjectSet ::= "{" ObjectSetSpec "}"

export default function grok(cst: Production, ctx: GrokContext): ObjectSet {
  return grokObjectSetSpec(
    cst.children.find(
      (c: Production): boolean => c.type === ProductionType.ObjectSetSpec
    ),
    ctx
  );
}
