import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectFromObject from '../../constructs/AssignmentTypes/ObjectAssignment/ObjectFromObject.mjs';
import grokReferencedObjects from '../Defined.mjs';

// ObjectFromObject ::=
//     ReferencedObjects "." FieldName

// ReferencedObjects ::=
//     DefinedObject
//     | ParameterizedObject
//     | DefinedObjectSet
//     | ParameterizedObjectSet

// FieldName ::=
//     PrimitiveFieldName "." +

// PrimitiveFieldName ::=
//     typefieldreference
//     | valuefieldreference
//     | valuesetfieldreference
//     | objectfieldreference
//     | objectsetfieldreference

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectFromObject {
  const text: string = ctx.text;
  const ReferencedObjects: Production = cst.children[0];
  const FieldName: Production = cst.children[cst.children.length - 1];
  return {
    referencedObjects: grokReferencedObjects(
      ReferencedObjects.children[0],
      ctx
    ),
    fieldName: FieldName.children
      .filter(
        (child: Production): boolean =>
          child.type === ProductionType.PrimitiveFieldName
      )
      .map((pfn: Production): string =>
        text.slice(pfn.location.startIndex, pfn.location.endIndex)
      ),
    production: cst,
  };
}
