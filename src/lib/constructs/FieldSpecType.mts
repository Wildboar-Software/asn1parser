/**
 * Kind of field in an ASN.1 information object class.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const FieldSpecType = {
  TypeFieldSpec: 'TypeFieldSpec',
  FixedTypeValueFieldSpec: 'FixedTypeValueFieldSpec',
  VariableTypeValueFieldSpec: 'VariableTypeValueFieldSpec',
  FixedTypeValueSetFieldSpec: 'FixedTypeValueSetFieldSpec',
  VariableTypeValueSetFieldSpec: 'VariableTypeValueSetFieldSpec',
  ObjectFieldSpec: 'ObjectFieldSpec',
  ObjectSetFieldSpec: 'ObjectSetFieldSpec',
} as const;

export type FieldSpecType = (typeof FieldSpecType)[keyof typeof FieldSpecType];

export namespace FieldSpecType {
  export type TypeFieldSpec = (typeof FieldSpecType)['TypeFieldSpec'];
  export type FixedTypeValueFieldSpec = (typeof FieldSpecType)['FixedTypeValueFieldSpec'];
  export type VariableTypeValueFieldSpec = (typeof FieldSpecType)['VariableTypeValueFieldSpec'];
  export type FixedTypeValueSetFieldSpec = (typeof FieldSpecType)['FixedTypeValueSetFieldSpec'];
  export type VariableTypeValueSetFieldSpec = (typeof FieldSpecType)['VariableTypeValueSetFieldSpec'];
  export type ObjectFieldSpec = (typeof FieldSpecType)['ObjectFieldSpec'];
  export type ObjectSetFieldSpec = (typeof FieldSpecType)['ObjectSetFieldSpec'];
}

export default FieldSpecType;
