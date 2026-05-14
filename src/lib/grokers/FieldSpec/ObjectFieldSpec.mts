import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ObjectFieldSpec from '../../constructs/FieldSpec/ObjectFieldSpec.js';
import grokDefined from '../Defined.js';
import grokObject from '../Object.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

// ObjectFieldSpec ::=
//     objectfieldreference DefinedObjectClass ObjectOptionalitySpec?

// ObjectOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Object

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectFieldSpec {
  const DefinedObjectClass: Production = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.DefinedObjectClass
  ) as Production;
  const ObjectOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ObjectOptionalitySpec
  );
  return {
    specType: FieldSpecType.ObjectFieldSpec,
    definedObjectClass: grokDefined(DefinedObjectClass, ctx),
    optional: Boolean(ObjectOptionalitySpec),
    default:
      ObjectOptionalitySpec && ObjectOptionalitySpec.children.length > 1
        ? grokObject(
            ObjectOptionalitySpec.children[
              ObjectOptionalitySpec.children.length - 1
            ],
            ctx
          )
        : undefined,
  };
}
