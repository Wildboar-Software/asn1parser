import type TypeFieldSpec from './TypeFieldSpec.js';
import type FixedTypeValueFieldSpec from './FixedTypeValueFieldSpec.js';
import type VariableTypeValueFieldSpec from './VariableTypeValueFieldSpec.js';
import type FixedTypeValueSetFieldSpec from './FixedTypeValueSetFieldSpec.js';
import type VariableTypeValueSetFieldSpec from './VariableTypeValueSetFieldSpec.js';
import type ObjectFieldSpec from './ObjectFieldSpec.js';
import type ObjectSetFieldSpec from './ObjectSetFieldSpec.js';

export type FieldSpec =
  | TypeFieldSpec
  | FixedTypeValueFieldSpec
  | VariableTypeValueFieldSpec
  | FixedTypeValueSetFieldSpec
  | VariableTypeValueSetFieldSpec
  | ObjectFieldSpec
  | ObjectSetFieldSpec;
