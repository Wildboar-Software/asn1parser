import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type TypeFieldSpec from '../../constructs/FieldSpec/TypeFieldSpec.js';
import grokType from '../Type.js';
import FieldSpecType from '../../constructs/FieldSpecType.js';

// TypeFieldSpec ::=
//     typefieldreference TypeOptionalitySpec?

// TypeOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Type

export default function grok(cst: Production, ctx: GrokContext): TypeFieldSpec {
  const TypeOptionalitySpec: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.TypeOptionalitySpec
  );
  return {
    specType: FieldSpecType.TypeFieldSpec,
    optional: Boolean(TypeOptionalitySpec),
    default:
      TypeOptionalitySpec && TypeOptionalitySpec.children.length > 1
        ? grokType(
            TypeOptionalitySpec.children[
              TypeOptionalitySpec.children.length - 1
            ],
            ctx
          )
        : undefined,
  };
}
