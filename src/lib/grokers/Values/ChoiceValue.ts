import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import type ChoiceValue from '../../constructs/Values/ChoiceValue.js';
import grokValue from '../Value.js';

// ChoiceValue ::= identifier ":" Value

export default function grokChoiceValue(
  cst: Production,
  ctx: GrokContext
): ChoiceValue {
  const text: string = ctx.text;
  const identifier: Production = cst.children[0];
  const value: Production = cst.children[cst.children.length - 1];
  if (!identifier || !value) {
    throw new Error('Undefined ChoiceValue identifier or value.');
  }
  return {
    identifier: text.slice(
      identifier.location.startIndex,
      identifier.location.endIndex
    ),
    value: grokValue(value, ctx),
  };
}
