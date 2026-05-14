import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type FieldName } from '../constructs/FieldName.mjs';

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
