import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type VariableTypeValueFieldSpec from '../../constructs/FieldSpec/VariableTypeValueFieldSpec.js';
import grokFieldName from '../FieldName.js';
import grokValue from '../Value.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

// VariableTypeValueFieldSpec ::=
//     valuefieldreference FieldName ValueOptionalitySpec ?

// ValueOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Value

export default function grok(
  cst: Production,
  ctx: GrokContext
): VariableTypeValueFieldSpec {
  const FieldName: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.FieldName
  ) as Production;
  const ValueOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ValueOptionalitySpec
  );
  return {
    specType: FieldSpecType.VariableTypeValueFieldSpec,
    fieldName: grokFieldName(FieldName, ctx),
    optional: Boolean(ValueOptionalitySpec),
    default:
      ValueOptionalitySpec && ValueOptionalitySpec.children.length > 1
        ? grokValue(
            ValueOptionalitySpec.children[
              ValueOptionalitySpec.children.length - 1
            ],
            ctx
          )
        : undefined,
  };
}
