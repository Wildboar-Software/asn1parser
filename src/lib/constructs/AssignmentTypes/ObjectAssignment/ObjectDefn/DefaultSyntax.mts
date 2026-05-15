import { type Setting } from '../Setting.mjs';
import type Production from '../../../../Production.mjs';

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

export type DefaultSyntax = {
  fieldSettings: {
    [PrimitiveFieldName: string]: Setting;
  };
  fieldProductions?: {
    [PrimitiveFieldName: string]: Production;
  };
};
