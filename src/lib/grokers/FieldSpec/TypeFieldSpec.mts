import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type TypeFieldSpec from '../../constructs/FieldSpec/TypeFieldSpec.mjs';
import grokType from '../Type.mjs';
import FieldSpecType from '../../constructs/FieldSpecType.mjs';

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
    production: cst,
  };
}
