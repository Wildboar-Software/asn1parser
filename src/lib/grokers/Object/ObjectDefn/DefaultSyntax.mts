import type GrokContext from '../../../interfaces/GrokContext.mjs';
import type Production from '../../../Production.mjs';
import ProductionType from '../../../ProductionType.mjs';
import { type DefaultSyntax } from '../../../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefaultSyntax.mjs';
import grokSetting from '../Setting.mjs';

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

// PrimitiveFieldName ::=
//     typefieldreference
//     | valuefieldreference
//     | valuesetfieldreference
//     | objectfieldreference
//     | objectsetfieldreference

// Setting ::=
//     Type
//     | Value
//     | ValueSet
//     | Object
//     | ObjectSet

export default function grok(cst: Production, ctx: GrokContext): DefaultSyntax {
  const text: string = ctx.text;
  const fieldSettings = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.FieldSetting
  );
  if (!fieldSettings) {
    throw new Error("Missing FieldSetting in DefaultSyntax");
  }
  return {
    fieldSettings: Object.fromEntries(
      fieldSettings.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.FieldSetting
        )
        .map((fs) => {
          const PrimitiveFieldName: Production = fs.children[0];
          const Setting: Production = fs.children[fs.children.length - 1];
          return [
            text.slice(
              PrimitiveFieldName.location.startIndex,
              PrimitiveFieldName.location.endIndex
            ),
            grokSetting(Setting, ctx),
          ];
        })
    ),
  };
}
