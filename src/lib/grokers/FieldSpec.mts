import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type FieldSpec } from '../constructs/FieldSpec.mjs';
import grokTypeFieldSpec from './FieldSpec/TypeFieldSpec.mjs';
import grokFixedTypeValueFieldSpec from './FieldSpec/FixedTypeValueFieldSpec.mjs';
import grokVariableTypeValueFieldSpec from './FieldSpec/VariableTypeValueFieldSpec.mjs';
import grokFixedTypeValueSetFieldSpec from './FieldSpec/FixedTypeValueSetFieldSpec.mjs';
import grokVariableTypeValueSetFieldSpec from './FieldSpec/VariableTypeValueSetFieldSpec.mjs';
import grokObjectFieldSpec from './FieldSpec/ObjectFieldSpec.mjs';
import grokObjectSetFieldSpec from './FieldSpec/ObjectSetFieldSpec.mjs';

// FieldSpec ::=
//     TypeFieldSpec
//     | FixedTypeValueFieldSpec
//     | VariableTypeValueFieldSpec
//     | FixedTypeValueSetFieldSpec
//     | VariableTypeValueSetFieldSpec
//     | ObjectFieldSpec
//     | ObjectSetFieldSpec

export default function grok(cst: Production, ctx: GrokContext): FieldSpec {
  switch (cst.children[0].type) {
    case ProductionType.TypeFieldSpec: {
      return grokTypeFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.FixedTypeValueFieldSpec: {
      return grokFixedTypeValueFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.VariableTypeValueFieldSpec: {
      return grokVariableTypeValueFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.FixedTypeValueSetFieldSpec: {
      return grokFixedTypeValueSetFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.VariableTypeValueSetFieldSpec: {
      return grokVariableTypeValueSetFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.ObjectFieldSpec: {
      return grokObjectFieldSpec(cst.children[0], ctx);
    }
    case ProductionType.ObjectSetFieldSpec: {
      return grokObjectSetFieldSpec(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized FieldSpec alternative '${cst.children[0].type}'.`
      );
    }
  }
}
