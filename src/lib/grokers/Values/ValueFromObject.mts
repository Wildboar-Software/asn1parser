import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type ValueFromObject } from '../../constructs/Values/ValueFromObject.mjs';
import grokReferencedObjects from '../Defined.mjs';
import grokFieldName from '../FieldName.mjs';

// ValueFromObject ::= ReferencedObjects "." FieldName

// ReferencedObjects ::=
//     DefinedObject
//     | ParameterizedObject
//     | DefinedObjectSet
//     | ParameterizedObjectSet

export default function grok(
  cst: Production,
  ctx: GrokContext
): ValueFromObject {
  const ReferencedObjects: Production = cst.children[0];
  const FieldName: Production = cst.children[cst.children.length - 1];
  return {
    referencedObjects: grokReferencedObjects(
      ReferencedObjects.children[0],
      ctx
    ),
    fieldName: grokFieldName(FieldName, ctx),
  };
}
