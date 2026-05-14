import type GrokContext from '../interfaces/GrokContext.mjs';
import grokElementSetSpecs from './ElementSetSpecs.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ValueSet } from '../constructs/ValueSet.mjs';

// ValueSet ::= "{" ElementSetSpecs "}"

export default function grok(cst: Production, ctx: GrokContext): ValueSet {
  return grokElementSetSpecs(
    cst.children.find(
      (c: Production): boolean => c.type === ProductionType.ElementSetSpecs
    ) as Production,
    ctx
  );
}
