import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type ObjectIdentifierValue from  './ObjectIdentifierValue.mjs';
import type OctetStringValue from './OctetStringValue.mjs';

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
