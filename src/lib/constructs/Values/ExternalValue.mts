import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type ObjectIdentifierValue from  './ObjectIdentifierValue.mjs';
import type OctetStringValue from './OctetStringValue.mjs';

export default interface ExternalValue extends GrokedThing {
  syntax?: ObjectIdentifierValue;
  presentationContextId?: number;
  contextNegotiation?: {
    presentationContextId: number;
    transferSyntax: ObjectIdentifierValue;
  };
  dataValueDescriptor?: string;
  dataValue: OctetStringValue;
}
