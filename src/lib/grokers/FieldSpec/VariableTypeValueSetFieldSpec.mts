import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type VariableTypeValueSetFieldSpec from '../../constructs/FieldSpec/VariableTypeValueSetFieldSpec.js';
import grokFieldName from '../FieldName.js';
import grokValueSet from '../ValueSet.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

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
  };
}
