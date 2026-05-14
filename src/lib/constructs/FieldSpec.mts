import FieldSpecType from './FieldSpecType.js';
import type FixedTypeValueFieldSpec from './FieldSpec/FixedTypeValueFieldSpec.js';
import type FixedTypeValueSetFieldSpec from './FieldSpec/FixedTypeValueSetFieldSpec.js';
import type ObjectFieldSpec from './FieldSpec/ObjectFieldSpec.js';
import type ObjectSetFieldSpec from './FieldSpec/ObjectSetFieldSpec.js';
import type TypeFieldSpec from './FieldSpec/TypeFieldSpec.js';
import type VariableTypeValueFieldSpec from './FieldSpec/VariableTypeValueFieldSpec.js';
import type VariableTypeValueSetFieldSpec from './FieldSpec/VariableTypeValueSetFieldSpec.js';
import type GrokedThing from '../interfaces/GrokedThing.js';

export interface CommonFieldSpec extends GrokedThing {
  specType: FieldSpecType;
  optional: boolean;
}

export type FieldSpec =
  | FixedTypeValueFieldSpec
  | FixedTypeValueSetFieldSpec
  | ObjectFieldSpec
  | ObjectSetFieldSpec
  | TypeFieldSpec
  | VariableTypeValueFieldSpec
  | VariableTypeValueSetFieldSpec;
