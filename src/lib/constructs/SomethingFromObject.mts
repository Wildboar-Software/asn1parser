import type GrokedThing from '../interfaces/GrokedThing.js';
import { type ReferencedObjects } from './ReferencedObjects.js';
import { type FieldName } from './FieldName.js';

// ValueFromObject ::= ReferencedObjects "." FieldName
// ValueSetFromObjects ::= ReferencedObjects "." FieldName
// TypeFromObject ::= ReferencedObjects "." FieldName
// ObjectFromObject ::= ReferencedObjects "." FieldName
// ObjectSetFromObjects ::= ReferencedObjects "." FieldName

export interface SomethingFromObject extends GrokedThing {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
