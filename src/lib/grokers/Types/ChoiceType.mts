import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import type NamedType from '../../constructs/NamedType.mjs';
import grokType from '../Type.mjs';
import grokExceptionSpec from '../ExceptionSpec.mjs';
import { type ExceptionIdentification } from '../../constructs/ExceptionIdentification.mjs';
import { type Type } from '../../constructs/Type.mjs';

// ChoiceType ::=
// 	CHOICE "{" AlternativeTypeLists "}"

// AlternativeTypeLists ::=
//     RootAlternativeTypeList
// 	   | RootAlternativeTypeList
//          ","
//          ExtensionAndException
//          ExtensionAdditionAlternatives
//          OptionalExtensionMarker

// RootAlternativeTypeList ::=
//     AlternativeTypeList

// ExtensionAdditionAlternatives ::=
//     "," ExtensionAdditionAlternativesList
// 	| empty

// ExtensionAdditionAlternativesList ::=
//     ExtensionAdditionAlternative
// 	| ExtensionAdditionAlternativesList "," ExtensionAdditionAlternative

// ExtensionAdditionAlternative ::=
//     ExtensionAdditionAlternativesGroup
// 	| NamedType

// ExtensionAdditionAlternativesGroup ::=
// 	"[[" VersionNumber AlternativeTypeList "]]"

// AlternativeTypeList ::=
//     NamedType
//      | AlternativeTypeList "," NamedType

// export default
// interface ChoiceType extends Type {
//     rootAlternativeTypeList: NamedType[];
//     exception: string;
//     extensionAdditionAlternatives?: ({
//         versionNumber?: number;
//         alternativeTypeList: NamedType[];
//     } | NamedType)[];
// }

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  const AlternativeTypeLists: Production = components[2];
  const RootAlternativeTypeList: Production = AlternativeTypeLists.children[0];
  const AlternativeTypeList: Production = RootAlternativeTypeList.children[0];
  const rootAlternativeTypeList = AlternativeTypeList.children
    .filter(
      (child: Production): boolean => child.type === ProductionType.NamedType
    )
    .map((namedType: Production): NamedType => {
      const identifier: string = text.slice(
        namedType.children[0].location.startIndex,
        namedType.children[0].location.endIndex
      );
      return {
        identifier,
        type: grokType(namedType.children[2], ctx),
        production: namedType,
        productionType: namedType.type,
        text: text.slice(namedType.location.startIndex, namedType.location.endIndex),
      };
    });

  if (AlternativeTypeLists.children.length === 1) {
    // It is just RootAlternativeTypeList
    return {
      text: text.slice(cst.location.startIndex, cst.location.endIndex),
      typeType: TypeType.ChoiceType,
      type: {
        explicitlyExtensible: false,
        rootAlternativeTypeList,
      },
    };
  } else {
    const AlternativeTypeListsComponents: Production[] =
      AlternativeTypeLists.children.filter(
        (child: Production): boolean => child.type !== ProductionType.whitespace
      );
    const ExtensionAndException: Production = AlternativeTypeListsComponents[2];
    const ExtensionAdditionAlternatives: Production =
      AlternativeTypeListsComponents[3];
    const ExtensionAdditionAlternativesList: Production | undefined =
      ExtensionAdditionAlternatives.children[
        ExtensionAdditionAlternatives.children.length - 1
      ];

    let exception: ExceptionIdentification | undefined = undefined;
    if (ExtensionAndException.children.length > 1) {
      const ExceptionSpec: Production =
        ExtensionAndException.children[
          ExtensionAndException.children.length - 1
        ];
      if (ExceptionSpec.children.length > 0) {
        exception = grokExceptionSpec(ExceptionSpec, ctx);
      }
    }

    const extensionAdditionAlternatives = ExtensionAdditionAlternativesList
      ? ExtensionAdditionAlternativesList.children
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.ExtensionAdditionAlternative
          )
          .map((ExtensionAdditionAlternative: Production) => {
            const eaa: Production = ExtensionAdditionAlternative.children[0];
            if (
              eaa.type === ProductionType.ExtensionAdditionAlternativesGroup
            ) {
              const eaaComponents: Production[] = eaa.children.filter(
                (child: Production): boolean =>
                  child.type !== ProductionType.whitespace
              );
              const VersionNumber: Production = eaaComponents[2];
              const ExtensionAlternativeTypeList: Production = eaaComponents[3];
              const versionNumber: number | undefined =
                VersionNumber.children.length > 0
                  ? Number.parseInt(
                      text.slice(
                        VersionNumber.children[0].location.startIndex,
                        VersionNumber.children[0].location.endIndex
                      ),
                      10
                    )
                  : undefined;
              return {
                versionNumber,
                alternativeTypeList: ExtensionAlternativeTypeList.children
                  .filter(
                    (child: Production): boolean =>
                      child.type === ProductionType.NamedType
                  )
                  .map((namedType: Production): NamedType => {
                    const identifier: string = text.slice(
                      namedType.children[0].location.startIndex,
                      namedType.children[0].location.endIndex
                    );
                    return {
                      identifier,
                      type: grokType(namedType.children[2], ctx),
                      production: namedType,
                      productionType: namedType.type,
                      text: text.slice(namedType.location.startIndex, namedType.location.endIndex),
                    };
                  }),
              };
            } else {
              // It is a NamedType.
              const identifier: string = text.slice(
                eaa.children[0].location.startIndex,
                eaa.children[0].location.endIndex
              );
              return {
                identifier,
                type: grokType(eaa.children[2], ctx),
                production: eaa,
                productionType: eaa.type,
                text: text.slice(eaa.location.startIndex, eaa.location.endIndex),
              };
            }
          })
      : undefined;

    return {
      text: text.slice(cst.location.startIndex, cst.location.endIndex),
      typeType: TypeType.ChoiceType,
      type: {
        explicitlyExtensible: true,
        rootAlternativeTypeList,
        exception,
        extensionAdditionAlternatives,
      },
    };
  }
}
