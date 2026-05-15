import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import grokReferencedObjects from './Defined.mjs';
import grokFieldName from './FieldName.mjs';
import { type SomethingFromObject } from  '../constructs/SomethingFromObject.mjs';

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
    production: cst,
    productionType: cst.type,
  };
}
