import type GrokedThing from '../../interfaces/GrokedThing.js';
import type Defined from '../Defined.js';
import { type FieldName } from '../FieldName.js';

// ObjectClassFieldType ::=
//     DefinedObjectClass "." FieldName

export default interface ObjectClassFieldType extends GrokedThing {
  definedObjectClass: Defined;
  fieldName: FieldName;
}
