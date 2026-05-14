import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type RelativeOIDValue } from '../../constructs/Values/RelativeOIDValue.js';
import grokObjIdComponents from '../ObjIdComponents.js';
import { type ObjIdComponents } from '../../constructs/ObjIdComponents.js';
import ProductionType from '../../ProductionType.js';

// RelativeOIDValue ::=
//     "{" RelativeOIDComponentsList "}"

// RelativeOIDComponentsList ::=
//     RelativeOIDComponents
// 	| RelativeOIDComponents RelativeOIDComponentsList

// RelativeOIDComponents ::=
//     NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

export default function grokObjectIdentifierValue(
  cst: Production,
  ctx: GrokContext
): RelativeOIDValue {
  const RelativeOIDComponentsList: Production = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.RelativeOIDComponentsList
  ) as Production;
  const components: ObjIdComponents[] = RelativeOIDComponentsList.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.RelativeOIDComponents
    )
    .map((oic: Production): ObjIdComponents => grokObjIdComponents(oic, ctx));
  return components;
}
