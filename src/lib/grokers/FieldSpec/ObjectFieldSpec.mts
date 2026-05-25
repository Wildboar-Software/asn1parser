import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectFieldSpec from '../../constructs/FieldSpec/ObjectFieldSpec.mjs';
import grokDefined from '../Defined.mjs';
import grokObject from '../Object.mjs';
import FieldSpecType from '../../constructs/FieldSpecType.mjs';

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
    production: cst,
  };
}
