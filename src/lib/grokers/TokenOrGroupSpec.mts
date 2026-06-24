import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type TokenOrGroupSpec } from '../constructs/TokenOrGroupSpec.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

// `SyntaxList ::= "{" TokenOrGroupSpec empty + "}"`

export default function grok(
  cst: Production,
  ctx: GrokContext
): TokenOrGroupSpec {
  const text: string = ctx.text;
  if (cst.children.length !== 1) {
    throw new ASN1SyntaxError(
      cst,
      `Expected 1 child node in TokenOrGroupSpec, but got ${cst.children.length}.`,
      ctx.currentModule.name,
    );
  }
  const alt = cst.children[0];
  if (alt.type === ProductionType.RequiredToken) {
    const base: number = ctx.textStartsAtOffset ?? 0;
    return text.slice(alt.location.startIndex - base, alt.location.endIndex - base);
  } else if (alt.type === ProductionType.OptionalGroup) {
    const TokenOrGroupSpecs = alt.children.find(
      (child: Production): boolean =>
        child.type === ProductionType.TokenOrGroupSpec
    )!;
    return TokenOrGroupSpecs.children
      .filter((togs) => togs.type === ProductionType.TokenOrGroupSpec)
      .map((togs) => grok(togs, ctx));
  } else {
    throw new ASN1SyntaxError(
      cst,
      `Unrecognized TokenOrGroupSpec alternative ${alt.type}.`,
      ctx.currentModule.name,
    );
  }
}
