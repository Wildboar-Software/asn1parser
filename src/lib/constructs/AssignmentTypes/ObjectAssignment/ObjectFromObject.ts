import { type ReferencedObjects } from '../../ReferencedObjects.js';
import { type FieldName } from '../../FieldName.js';

// ObjectFromObject ::=
//     ReferencedObjects "." FieldName

export default interface ObjectFromObject {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
