import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type VariableTypeValueSetFieldSpec from '../../constructs/FieldSpec/VariableTypeValueSetFieldSpec.mjs';
import grokFieldName from '../FieldName.mjs';
import grokValueSet from '../ValueSet.mjs';
import FieldSpecType from '../../constructs/FieldSpecType.mjs';

// VariableTypeValueSetFieldSpec ::=
//     valuesetfieldreference FieldName ValueSetOptionalitySpec?

// ValueSetOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT ValueSet

export default function grok(
  cst: Production,
  ctx: GrokContext
): VariableTypeValueSetFieldSpec {
  const FieldName: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.FieldName
  ) as Production;
  const ValueSetOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ValueSetOptionalitySpec
  );
  return {
    specType: FieldSpecType.VariableTypeValueSetFieldSpec,
    fieldName: grokFieldName(FieldName, ctx),
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
    production: cst,
  };
}
