import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type FieldSpec } from '../constructs/FieldSpec.js';
import grokTypeFieldSpec from './FieldSpec/TypeFieldSpec.js';
import grokFixedTypeValueFieldSpec from './FieldSpec/FixedTypeValueFieldSpec.js';
import grokVariableTypeValueFieldSpec from './FieldSpec/VariableTypeValueFieldSpec.js';
import grokFixedTypeValueSetFieldSpec from './FieldSpec/FixedTypeValueSetFieldSpec.js';
import grokVariableTypeValueSetFieldSpec from './FieldSpec/VariableTypeValueSetFieldSpec.js';
import grokObjectFieldSpec from './FieldSpec/ObjectFieldSpec.js';
import grokObjectSetFieldSpec from './FieldSpec/ObjectSetFieldSpec.js';

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
