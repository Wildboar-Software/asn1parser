import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectSetFieldSpec from '../../constructs/FieldSpec/ObjectSetFieldSpec.mjs';
import grokDefined from '../Defined.mjs';
import grokObjectSet from '../ObjectSet.mjs';
import FieldSpecType from '../../constructs/FieldSpecType.mjs';

// ObjectSetFieldSpec ::=
//     objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?

// ObjectSetOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT ObjectSet

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectSetFieldSpec {
  const DefinedObjectClass: Production = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.DefinedObjectClass
  ) as Production;
  const ObjectSetOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ObjectSetOptionalitySpec
  );
  return {
    specType: FieldSpecType.ObjectSetFieldSpec,
    definedObjectClass: grokDefined(DefinedObjectClass, ctx),
    optional: Boolean(ObjectSetOptionalitySpec),
    default:
      ObjectSetOptionalitySpec && ObjectSetOptionalitySpec.children.length > 1
        ? grokObjectSet(
            ObjectSetOptionalitySpec.children[
              ObjectSetOptionalitySpec.children.length - 1
            ],
            ctx
          )
        : undefined,
  };
}
