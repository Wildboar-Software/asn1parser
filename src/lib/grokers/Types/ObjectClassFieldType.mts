import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import grokDefined from '../Defined.js';
import TypeType from '../../constructs/TypeType.js';
import { type Type } from '../../constructs/Type.js';

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
