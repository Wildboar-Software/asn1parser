import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ObjectSetFieldSpec from '../../constructs/FieldSpec/ObjectSetFieldSpec.js';
import grokDefined from '../Defined.js';
import grokObjectSet from '../ObjectSet.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

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
