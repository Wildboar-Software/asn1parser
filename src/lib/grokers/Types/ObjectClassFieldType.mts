import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
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
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.ObjectClassFieldType,
    type: {
      definedObjectClass: grokDefined(components[0], ctx),
      fieldName: text
        .slice(
          components[2].location.startIndex,
          components[2].location.endIndex
        )
        .split('.'),
    },
  };
}
