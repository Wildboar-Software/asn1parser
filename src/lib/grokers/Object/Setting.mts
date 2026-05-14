import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import { type Setting } from '../../constructs/AssignmentTypes/ObjectAssignment/Setting.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';
import grokValueSet from '../ValueSet.mjs';
import grokObject from '../Object.mjs';
import grokObjectSet from '../ObjectSet.mjs';

/**
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 * @param cst
 * @param ctx
 */
export default function grok(cst: Production, ctx: GrokContext): Setting {
  if (cst.children.length !== 1) {
    throw new Error(cst.children.length.toString());
  }
  const text: string = ctx.text.slice(
    cst.location.startIndex,
    cst.location.endIndex
  );
  const alt: Production = cst.children[0];
  switch (alt.type) {
    case ProductionType.Type: {
      return {
        text,
        type: grokType(alt, ctx),
      };
    }
    case ProductionType.Value: {
      return {
        text,
        value: grokValue(alt, ctx),
      };
    }
    case ProductionType.ValueSet: {
      return {
        text,
        valueSet: grokValueSet(alt, ctx),
      };
    }
    case ProductionType.Object: {
      return {
        text,
        object: grokObject(alt, ctx),
      };
    }
    case ProductionType.ObjectSet: {
      return {
        text,
        objectSet: grokObjectSet(alt, ctx),
      };
    }
    default: {
      throw new Error(alt.type);
    }
  }
}
