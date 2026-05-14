import type GrokContext from '../interfaces/GrokContext.js';
import grokElementSetSpecs from './ElementSetSpecs.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ValueSet } from '../constructs/ValueSet.js';

// ValueSet ::= "{" ElementSetSpecs "}"

export default function grok(cst: Production, ctx: GrokContext): ValueSet {
  return grokElementSetSpecs(
    cst.children.find(
      (c: Production): boolean => c.type === ProductionType.ElementSetSpecs
    ) as Production,
    ctx
  );
}
