import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type FieldName } from '../constructs/FieldName.js';

// PrimitiveFieldName ::=
//     typefieldreference
//     | valuefieldreference
//     | valuesetfieldreference
//     | objectfieldreference
//     | objectsetfieldreference

// FieldName ::=
//     PrimitiveFieldName "." +

export default function grok(cst: Production, ctx: GrokContext): FieldName {
  const text: string = ctx.text;
  return cst.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.PrimitiveFieldName
    )
    .map((pfn: Production): string =>
      text.slice(pfn.location.startIndex, pfn.location.endIndex).trim()
    );
}
