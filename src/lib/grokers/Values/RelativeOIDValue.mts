import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type RelativeOIDValue } from '../../constructs/Values/RelativeOIDValue.mjs';
import grokObjIdComponents from '../ObjIdComponents.mjs';
import { type ObjIdComponents } from '../../constructs/ObjIdComponents.mjs';
import ProductionType from '../../ProductionType.mjs';

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
