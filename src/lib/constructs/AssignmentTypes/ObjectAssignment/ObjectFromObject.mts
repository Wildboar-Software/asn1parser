import { type ReferencedObjects } from '../../ReferencedObjects.mjs';
import { type FieldName } from '../../FieldName.mjs';

// ObjectFromObject ::=
//     ReferencedObjects "." FieldName

export default interface ObjectFromObject {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
