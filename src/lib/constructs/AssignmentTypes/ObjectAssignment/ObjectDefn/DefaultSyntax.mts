import { type Setting } from '../Setting.mjs';

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

export type DefaultSyntax = {
  fieldSettings: {
    [PrimitiveFieldName: string]: Setting;
  };
};
