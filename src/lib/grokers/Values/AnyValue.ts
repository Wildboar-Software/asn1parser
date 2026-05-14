import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import type AnyValue from '../../constructs/Values/AnyValue.js';
import grokType from '../Type.js';
import grokValue from '../Value.js';

/**
 * `AnyValue ::= Type Value`
 */
export default function grok(cst: Production, ctx: GrokContext): AnyValue {
  return {
    type: grokType(cst.children[0], ctx),
    value: grokValue(cst.children[cst.children.length - 1], ctx),
  };
}
