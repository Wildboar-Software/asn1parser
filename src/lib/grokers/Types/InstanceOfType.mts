import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import grokDefined from '../Defined.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import { type Type } from '../../constructs/Type.mjs';

// InstanceOfType ::=
//     INSTANCE OF DefinedObjectClass

// DefinedObjectClass ::=
//     ExternalObjectClassReference
//     | objectclassreference
//     | UsefulObjectClassReference

// ExternalObjectClassReference ::=
//     modulereference "." objectclassreference

// UsefulObjectClassReference ::=
//     TYPE-IDENTIFIER
//     | ABSTRACT-SYNTAX

export default function grok(cst: Production, ctx: GrokContext): Type {
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  return {
    text: ctx.text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.InstanceOfType,
    type: {
      definedObjectClass: grokDefined(components[2], ctx),
    },
  };
}
