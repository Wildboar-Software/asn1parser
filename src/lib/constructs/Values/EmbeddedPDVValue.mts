import type GrokedThing from '../../interfaces/GrokedThing.js';
import type ObjectIdentifierValue from  './ObjectIdentifierValue.js';
import type OctetStringValue from './OctetStringValue.js';

export default interface EmbeddedPDVValue extends GrokedThing {
  syntaxes?: {
    abstract: ObjectIdentifierValue;
    transfer: ObjectIdentifierValue;
  };
  syntax?: ObjectIdentifierValue;
  presentationContextId?: number;
  contextNegotiation?: {
    presentationContextId: number;
    transferSyntax: ObjectIdentifierValue;
  };
  transferSyntax?: ObjectIdentifierValue;
  fixed?: null;

  dataValueDescriptor?: string;
  dataValue: OctetStringValue;
}
