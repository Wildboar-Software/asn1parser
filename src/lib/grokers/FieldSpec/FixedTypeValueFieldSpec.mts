import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type FixedTypeValueFieldSpec from '../../constructs/FieldSpec/FixedTypeValueFieldSpec.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';
import FieldSpecType from '../../constructs/FieldSpecType.mjs';

// TypeFixedTypeValueFieldSpec ::=
//     valuefieldreference Type UNIQUE? ValueOptionalitySpec ?

// ValueOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Value

export default function grok(
  cst: Production,
  ctx: GrokContext
): FixedTypeValueFieldSpec {
  const Type: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.Type
  ) as Production;
  const UNIQUE: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType._UNIQUE
  );
  const ValueOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ValueOptionalitySpec
  );
  return {
    specType: FieldSpecType.FixedTypeValueFieldSpec,
    type: grokType(Type, ctx),
    unique: Boolean(UNIQUE),
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
