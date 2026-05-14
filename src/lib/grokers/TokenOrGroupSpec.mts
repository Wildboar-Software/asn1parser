import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type TokenOrGroupSpec } from '../constructs/TokenOrGroupSpec.mjs';

// `SyntaxList ::= "{" TokenOrGroupSpec empty + "}"`

export default function grok(
  cst: Production,
  ctx: GrokContext
): TokenOrGroupSpec {
  const text: string = ctx.text;
  if (cst.children.length !== 1) {
    throw new Error(cst.children.length.toString());
  }
  const alt = cst.children[0];
  if (alt.type === ProductionType.RequiredToken) {
    return text.slice(alt.location.startIndex, alt.location.endIndex);
  } else if (alt.type === ProductionType.OptionalGroup) {
    const TokenOrGroupSpecs = alt.children.find(
      (child: Production): boolean =>
        child.type === ProductionType.TokenOrGroupSpec
    )!;
    return TokenOrGroupSpecs.children
      .filter((togs) => togs.type === ProductionType.TokenOrGroupSpec)
      .map((togs) => grok(togs, ctx));
  } else {
    throw new Error(alt.type);
  }
}
