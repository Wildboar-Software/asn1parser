import type TypeFieldSpec from './TypeFieldSpec.mjs';
import type FixedTypeValueFieldSpec from './FixedTypeValueFieldSpec.mjs';
import type VariableTypeValueFieldSpec from './VariableTypeValueFieldSpec.mjs';
import type FixedTypeValueSetFieldSpec from './FixedTypeValueSetFieldSpec.mjs';
import type VariableTypeValueSetFieldSpec from './VariableTypeValueSetFieldSpec.mjs';
import type ObjectFieldSpec from './ObjectFieldSpec.mjs';
import type ObjectSetFieldSpec from './ObjectSetFieldSpec.mjs';

export type FieldSpec =
  | TypeFieldSpec
  | FixedTypeValueFieldSpec
  | VariableTypeValueFieldSpec
  | FixedTypeValueSetFieldSpec
  | VariableTypeValueSetFieldSpec
  | ObjectFieldSpec
  | ObjectSetFieldSpec;
