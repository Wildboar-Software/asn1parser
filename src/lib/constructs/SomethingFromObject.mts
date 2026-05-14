import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ReferencedObjects } from './ReferencedObjects.mjs';
import { type FieldName } from './FieldName.mjs';

// ValueFromObject ::= ReferencedObjects "." FieldName
// ValueSetFromObjects ::= ReferencedObjects "." FieldName
// TypeFromObject ::= ReferencedObjects "." FieldName
// ObjectFromObject ::= ReferencedObjects "." FieldName
// ObjectSetFromObjects ::= ReferencedObjects "." FieldName

export interface SomethingFromObject extends GrokedThing {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
