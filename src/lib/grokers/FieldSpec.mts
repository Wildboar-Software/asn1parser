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
      const fs = grokTypeFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.FixedTypeValueFieldSpec: {
      const fs = grokFixedTypeValueFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.VariableTypeValueFieldSpec: {
      const fs = grokVariableTypeValueFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.FixedTypeValueSetFieldSpec: {
      const fs = grokFixedTypeValueSetFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.VariableTypeValueSetFieldSpec: {
      const fs = grokVariableTypeValueSetFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.ObjectFieldSpec: {
      const fs = grokObjectFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    case ProductionType.ObjectSetFieldSpec: {
      const fs = grokObjectSetFieldSpec(cst.children[0], ctx);
      fs.production = cst;
      fs.productionType = cst.type;
      return fs;
    }
    default: {
      throw new Error(
        `Unrecognized FieldSpec alternative '${cst.children[0].type}'.`
      );
    }
  }
}
