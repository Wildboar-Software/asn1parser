import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type AnyValue from '../../constructs/Values/AnyValue.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';

/**
 * `AnyValue ::= Type Value`
 */
export default function grok(cst: Production, ctx: GrokContext): AnyValue {
  return {
    type: grokType(cst.children[0], ctx),
    value: grokValue(cst.children[cst.children.length - 1], ctx),
    production: cst,
  };
}
