import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type ValueFromObject } from '../../constructs/Values/ValueFromObject.js';
import grokReferencedObjects from '../Defined.js';
import grokFieldName from '../FieldName.js';

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
