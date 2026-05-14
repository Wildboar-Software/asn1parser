import { type Setting } from '../Setting.js';

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

export type DefaultSyntax = {
  fieldSettings: {
    [PrimitiveFieldName: string]: Setting;
  };
};
