import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type ChoiceValue from '../../constructs/Values/ChoiceValue.mjs';
import grokValue from '../Value.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

// ChoiceValue ::= identifier ":" Value

export default function grokChoiceValue(
  cst: Production,
  ctx: GrokContext
): ChoiceValue {
  const text: string = ctx.text;
  const identifier: Production = cst.children[0];
  const value: Production = cst.children[cst.children.length - 1];
  if (!identifier || !value) {
    throw new ASN1SyntaxError(
      cst,
      'Undefined ChoiceValue identifier or value.',
      ctx.currentModule.name,
    );
  }
  return {
    identifier: text.slice(
      identifier.location.startIndex,
      identifier.location.endIndex
    ),
    value: grokValue(value, ctx),
    production: cst,
  };
}
