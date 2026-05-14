import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import grokReferencedObjects from './Defined.js';
import grokFieldName from './FieldName.js';
import { type SomethingFromObject } from  '../constructs/SomethingFromObject.js';

/**
 * `ValueFromObject ::= ReferencedObjects "." FieldName`
 * `ValueSetFromObjects ::= ReferencedObjects "." FieldName`
 * `TypeFromObject ::= ReferencedObjects "." FieldName`
 * `ObjectFromObject ::= ReferencedObjects "." FieldName`
 * `ObjectSetFromObjects ::= ReferencedObjects "." FieldName`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): SomethingFromObject {
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
