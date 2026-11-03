import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import grokDefined from '../Defined.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import { type Type } from '../../constructs/Type.mjs';

// interface ObjectClassFieldType extends Type {
//     definedObjectClass: string;
//     fieldName: FieldName;
// }

// ObjectClassFieldType ::=
//     DefinedObjectClass "." FieldName

export default function grok(cst: Production, ctx: GrokContext): Type {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  return {
    text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
    typeType: TypeType.ObjectClassFieldType,
    type: {
      definedObjectClass: grokDefined(components[0], ctx),
      fieldName: text
        .slice(
          components[2].location.startIndex - base,
          components[2].location.endIndex - base
        )
        .split('.'),
    },
    production: cst
  };
}
