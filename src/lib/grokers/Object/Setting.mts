import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import { type Setting } from '../../constructs/AssignmentTypes/ObjectAssignment/Setting.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';
import grokValueSet from '../ValueSet.mjs';
import grokObject from '../Object.mjs';
import grokObjectSet from '../ObjectSet.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import ASN1ParserExpectationError from '../../errors/ASN1ParserExpectationError.mjs';

/**
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 * @param cst
 * @param ctx
 */
export default function grok(cst: Production, ctx: GrokContext): Setting {
  if (cst.children.length !== 1) {
    throw new ASN1ParserExpectationError(
      "Setting CST node had an unexpected number of child nodes: " + cst.children.length.toString(),
      cst,
      ctx.currentModule.name,
    );
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
        production: alt,
        productionType: alt.type,
      };
    }
    case ProductionType.Value: {
      return {
        text,
        value: grokValue(alt, ctx),
        production: alt,
        productionType: alt.type,
      };
    }
    case ProductionType.ValueSet: {
      return {
        text,
        valueSet: grokValueSet(alt, ctx),
        production: alt,
        productionType: alt.type,
      };
    }
    case ProductionType.Object: {
      return {
        text,
        object: grokObject(alt, ctx),
        production: alt,
        productionType: alt.type,
      };
    }
    case ProductionType.ObjectSet: {
      return {
        text,
        objectSet: grokObjectSet(alt, ctx),
        production: alt,
        productionType: alt.type,
      };
    }
    default: {
      throw new ASN1SyntaxError(
        alt,
        "Unrecognized variant for Setting: " + alt.type,
        ctx.currentModule.name,
      );
    }
  }
}
