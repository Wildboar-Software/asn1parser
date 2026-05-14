import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type Defined from '../Defined.mjs';
import { type FieldName } from '../FieldName.mjs';

// ObjectClassFieldType ::=
//     DefinedObjectClass "." FieldName

export default interface ObjectClassFieldType extends GrokedThing {
  definedObjectClass: Defined;
  fieldName: FieldName;
}
