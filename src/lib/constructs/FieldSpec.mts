import FieldSpecType from './FieldSpecType.mjs';
import type FixedTypeValueFieldSpec from './FieldSpec/FixedTypeValueFieldSpec.mjs';
import type FixedTypeValueSetFieldSpec from './FieldSpec/FixedTypeValueSetFieldSpec.mjs';
import type ObjectFieldSpec from './FieldSpec/ObjectFieldSpec.mjs';
import type ObjectSetFieldSpec from './FieldSpec/ObjectSetFieldSpec.mjs';
import type TypeFieldSpec from './FieldSpec/TypeFieldSpec.mjs';
import type VariableTypeValueFieldSpec from './FieldSpec/VariableTypeValueFieldSpec.mjs';
import type VariableTypeValueSetFieldSpec from './FieldSpec/VariableTypeValueSetFieldSpec.mjs';
import type GrokedThing from '../interfaces/GrokedThing.mjs';

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
