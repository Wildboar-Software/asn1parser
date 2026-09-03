import type GrokContext from '../interfaces/GrokContext.mjs';
import grokElementSetSpecs from './ElementSetSpecs.mjs';
import type Production from '../Production.mjs';
import { ProductionType } from '../ProductionType.mjs';
import { type ValueSet } from '../constructs/ValueSet.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

// ValueSet ::= "{" ElementSetSpecs "}"

export default function grok(cst: Production, ctx: GrokContext): ValueSet {
  const ess = cst.children.find(
    (c: Production): boolean => c.type === ProductionType.ElementSetSpecs
  );
  if (!ess) {
    throw new ASN1SyntaxError(
      cst,
      "Missing ElementSetSpecs CST node immediately under a ValueSet CST node",
    );
  }
  return grokElementSetSpecs(ess, ctx);
}
