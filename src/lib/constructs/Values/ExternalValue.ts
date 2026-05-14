import type GrokedThing from '../../interfaces/GrokedThing.js';
import type ObjectIdentifierValue from  './ObjectIdentifierValue.js';
import type OctetStringValue from './OctetStringValue.js';

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
