import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import { type Type } from '../../constructs/Type.js';
import TypeType from '../../constructs/TypeType.js';
import grokType from '../Type.js';
import grokDefined from '../Defined.js';
import type Defined from '../../constructs/Defined.js';

// PrefixedType ::=
//     TaggedType
// 	| EncodingPrefixedType

// EncodingPrefixedType ::=
//     EncodingPrefix Type

// EncodingPrefix ::=
// 	"[" EncodingReference EncodingInstruction "]"

// TaggedType ::=
// 	Tag Type
// 	| Tag IMPLICIT Type
// 	| Tag EXPLICIT Type

// Tag ::=
// 	"[" EncodingReference Class ClassNumber "]"

// EncodingReference ::=
//     encodingreference ":"
// 	| empty

// ClassNumber ::=
//     number
// 	| DefinedValue

// Class ::=
//     UNIVERSAL
// 	| APPLICATION
// 	| PRIVATE
// 	| empty

// DefinedValue ::=
//     ExternalValueReference
// 	| valuereference
// 	| ParameterizedValue

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  // If it is the EncodingPrefixedType, we just ignore the prefix.
  if (components[0].type === ProductionType.EncodingPrefixedType) {
    const EncodingPrefixedType: Production = components[0];
    return grokType(
      EncodingPrefixedType.children[EncodingPrefixedType.children.length - 1],
      ctx
    );
  }
  const TaggedType: Production = components[0];
  const Tag: Production = TaggedType.children[0];
  const Type_: Production = TaggedType.children[TaggedType.children.length - 1];
  const explicit: boolean | undefined = ((): boolean | undefined => {
    const tm = TaggedType.children.find(
      (child: Production) =>
        child.type === ProductionType._EXPLICIT ||
        child.type === ProductionType._IMPLICIT
    );
    if (!tm) {
      return undefined;
    }
    return !tm || tm.type === ProductionType._EXPLICIT;
  })();

  const tagComponents: Production[] = Tag.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    );
  const EncodingReference: Production = tagComponents.find(
    (tc) => tc.type === ProductionType.EncodingReference
  ) as Production;
  const Class: Production = tagComponents.find(
    (tc) => tc.type === ProductionType.Class
  ) as Production;
  const ClassNumber: Production = tagComponents.find(
    (tc) => tc.type === ProductionType.ClassNumber
  ) as Production;

  // const EncodingReference: Production = tagComponents[0];
  const class_: string = text.slice(
    Class.location.startIndex,
    Class.location.endIndex
  );
  const classNumber: number | Defined =
    ClassNumber.children[0].type === ProductionType.DefinedValue
      ? grokDefined(ClassNumber.children[0], ctx)
      : Number.parseInt(
          text.slice(
            ClassNumber.location.startIndex,
            ClassNumber.location.endIndex
          ),
          10
        );

  return {
    typeType: TypeType.PrefixedType,
    tagging: {
      tag: {
        encodingReference: EncodingReference
          ? text
              .slice(
                EncodingReference.location.startIndex,
                EncodingReference.location.endIndex
              )
              .replace(':', '')
          : undefined,
        // I never found out why, but for some reason, the class sometimes appears as " " rather than "".
        class_: class_.length <= 1 ? 'CONTEXT' : class_,
        classNumber,
      },
      explicit,
    },
    type: grokType(Type_, ctx),
  };
}
