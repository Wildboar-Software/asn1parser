import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import { type GeneralConstraint } from '../../constructs/ConstraintSpecs/GeneralConstraint.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';
import grokObjectSet from '../ObjectSet.mjs';
import grokDefined from '../Defined.mjs';

/**
 * `GeneralConstraint ::= UserDefinedConstraint | TableConstraint | ContentsConstraint`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): GeneralConstraint {
  const text: string = ctx.text;
  const alt = cst.children[0];
  if (alt.type === ProductionType.UserDefinedConstraint) {
    const param: Production | undefined = alt.children.find(
      (prod: Production): boolean =>
        prod.type === ProductionType.UserDefinedConstraintParameter
    )!;
    return {
      constrainedBy: param.children
        .filter(
          (prod: Production): boolean =>
            prod.type === ProductionType.UserDefinedConstraintParameter
        )
        .map((udcp: Production): string =>
          text.slice(udcp.location.startIndex, udcp.location.endIndex)
        ),
      production: cst,
    };
  } else if (alt.type === ProductionType.TableConstraint) {
    const subalt = alt.children[0];
    if (subalt.type === ProductionType.SimpleTableConstraint) {
      return grokObjectSet(subalt.children[0], ctx);
    } else if (subalt.type === ProductionType.ComponentRelationConstraint) {
      const crc = subalt;
      const dos: Production | undefined = crc.children.find(
        (prod: Production): boolean =>
          prod.type === ProductionType.DefinedObjectSet
      );
      const at: Production | undefined = crc.children.find(
        (prod: Production): boolean => prod.type === ProductionType.AtNotation
      );
      if (!dos || !at) {
        throw new Error();
      }
      return {
        definedObjectSet: grokDefined(dos, ctx),
        atNotation: at.children
          .filter(
            (prod: Production): boolean =>
              prod.type === ProductionType.AtNotation
          )
          .map((a) => text.slice(a.location.startIndex, a.location.endIndex)),
        production: cst,
      };
    } else {
      throw new Error();
    }
  } else if (alt.type === ProductionType.ContentsConstraint) {
    const Type: Production | undefined = alt.children.find(
      (prod: Production): boolean => prod.type === ProductionType.Type
    )!;
    const Value: Production | undefined = alt.children.find(
      (prod: Production): boolean => prod.type === ProductionType.Value
    )!;
    return {
      containing: grokType(Type, ctx),
      encodedBy: grokValue(Value, ctx),
      production: cst,
    };
  } else {
    throw new Error();
  }
}
