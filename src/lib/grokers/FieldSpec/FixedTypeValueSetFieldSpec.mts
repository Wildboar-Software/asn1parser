import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type FixedTypeValueSetFieldSpec from '../../constructs/FieldSpec/FixedTypeValueSetFieldSpec.js';
import grokType from '../Type.js';
import grokValueSet from '../ValueSet.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

// FixedTypeValueSetFieldSpec ::=
//     valuesetfieldreference Type ValueSetOptionalitySpec ?

// ValueSetOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT ValueSet

export default function grok(
  cst: Production,
  ctx: GrokContext
): FixedTypeValueSetFieldSpec {
  const Type: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.Type
  ) as Production;
  const ValueSetOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ValueSetOptionalitySpec
  );
  return {
    specType: FieldSpecType.FixedTypeValueSetFieldSpec,
    type: grokType(Type, ctx),
    optional: Boolean(ValueSetOptionalitySpec),
    default:
      ValueSetOptionalitySpec && ValueSetOptionalitySpec.children.length > 1
        ? grokValueSet(
            ValueSetOptionalitySpec.children[
              ValueSetOptionalitySpec.children.length - 1
            ],
            ctx
          )
        : undefined,
  };
}
