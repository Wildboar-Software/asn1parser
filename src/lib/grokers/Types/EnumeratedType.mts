import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type EnumerationItem from '../../constructs/EnumerationItem.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import grokDefined from '../Defined.mjs';
import grokExceptionSpec from '../ExceptionSpec.mjs';
import { type ExceptionIdentification } from '../../constructs/ExceptionIdentification.mjs';
import { type Type } from '../../constructs/Type.mjs';

// EnumeratedType ::=
//     ENUMERATED "{" Enumerations "}"

// Enumerations ::=
//     RootEnumeration
// 	| RootEnumeration "," "..." ExceptionSpec
// 	| RootEnumeration "," "..." ExceptionSpec "," AdditionalEnumeration

// RootEnumeration ::=
//     Enumeration

// AdditionalEnumeration ::=
//     Enumeration

// Enumeration ::=
//     EnumerationItem
// 	| EnumerationItem "," Enumeration

// EnumerationItem ::=
//     identifier
// 	| NamedNumber

// NamedNumber ::=
//     identifier "(" SignedNumber ")"
// 	| identifier "(" DefinedValue ")"

// ExceptionSpec ::=
//     "!" ExceptionIdentification
// 	| empty

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  const Enumerations = components[2];
  const EnumerationsComponents: Production[] = Enumerations.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );

  const extensible: boolean = EnumerationsComponents.length > 1;
  const encounteredNumbers: Set<number> = new Set<number>([]);
  let selfContained: boolean = true;
  let allItemsExplicitlyNumbered: boolean = true;

  const RootEnumeration = EnumerationsComponents[0];
  const Enumeration = RootEnumeration.children[0];
  const rootEnumerations: EnumerationItem[] = Enumeration.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.EnumerationItem
    )
    .map((ei: Production): Production => ei.children[0])
    .map((ei: Production) => {
      if (ei.type === ProductionType.identifier) {
        allItemsExplicitlyNumbered = false;
        const identifier = text.slice(
          ei.location.startIndex,
          ei.location.endIndex
        );
        return {
          identifier,
          number: undefined,
          additional: false,
        };
      } else {
        const namedNumberComponents: Production[] = ei.children.filter(
          (child: Production): boolean =>
            child.type !== ProductionType.whitespace
        );
        const identifier: string = text.slice(
          namedNumberComponents[0].location.startIndex,
          namedNumberComponents[0].location.endIndex
        );
        const numberString: string = text.slice(
          namedNumberComponents[2].location.startIndex,
          namedNumberComponents[2].location.endIndex
        );
        if (namedNumberComponents[2].type === ProductionType.SignedNumber) {
          const numericNumber: number = Number.parseInt(numberString, 10);
          if (!Number.isSafeInteger(numericNumber)) {
            throw new Error(
              `Could not safely convert '${numberString}' to an unsigned number.`
            );
          }
          if (encounteredNumbers.has(numericNumber)) {
            throw new Error(
              `Duplicate number ${numericNumber} in EnumeratedType.`
            );
          }
          encounteredNumbers.add(numericNumber);
          return {
            identifier,
            number: numericNumber,
            additional: false,
          };
        } else {
          selfContained = false;
          return {
            identifier,
            number: grokDefined(namedNumberComponents[2], ctx),
            additional: false,
          };
        }
      }
    });

  let exception: ExceptionIdentification | undefined = undefined;
  if (extensible) {
    const ExceptionSpec: Production = EnumerationsComponents[3];
    if (ExceptionSpec.children.length > 0) {
      exception = grokExceptionSpec(ExceptionSpec, ctx);
    }
  }

  const AdditionalEnumeration: Production | undefined =
    EnumerationsComponents[5];
  const Enumeration2: Production | undefined = AdditionalEnumeration
    ? AdditionalEnumeration.children[0]
    : undefined;
  const additionalEnumerations: EnumerationItem[] = Enumeration2
    ? Enumeration2.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.EnumerationItem
        )
        .map((ei: Production): Production => ei.children[0])
        .map((ei: Production) => {
          if (ei.type === ProductionType.identifier) {
            allItemsExplicitlyNumbered = false;
            const identifier = text.slice(
              ei.location.startIndex,
              ei.location.endIndex
            );
            return {
              identifier,
              number: undefined,
              additional: true,
            };
          } else {
            const namedNumberComponents: Production[] = ei.children.filter(
              (child: Production): boolean =>
                child.type !== ProductionType.whitespace
            );
            const identifier: string = text.slice(
              namedNumberComponents[0].location.startIndex,
              namedNumberComponents[0].location.endIndex
            );
            const numberString: string = text.slice(
              namedNumberComponents[2].location.startIndex,
              namedNumberComponents[2].location.endIndex
            );
            if (namedNumberComponents[2].type === ProductionType.SignedNumber) {
              const numericNumber: number = Number.parseInt(numberString, 10);
              if (!Number.isSafeInteger(numericNumber)) {
                throw new Error(
                  `Could not safely convert '${numberString}' to an unsigned number.`
                );
              }
              if (encounteredNumbers.has(numericNumber)) {
                throw new Error(
                  `Duplicate number ${numericNumber} in EnumeratedType.`
                );
              }
              encounteredNumbers.add(numericNumber);
              return {
                identifier,
                number: Number.parseInt(numberString, 10),
                additional: true,
              };
            } else {
              selfContained = false;
              return {
                identifier,
                number: grokDefined(namedNumberComponents[2], ctx),
                additional: true,
              };
            }
          }
        })
    : [];

  // This explicitly assigns numbers to those whose numbers are implicit.
  if (selfContained) {
    let candidateNumber: number = 0;

    /**
     * This explicitly assigns numbers to those root items whose
     * numbers are implicit.
     */
    rootEnumerations.forEach((item: EnumerationItem): void => {
      if (typeof item.number === 'undefined') {
        while (encounteredNumbers.has(candidateNumber)) {
          candidateNumber++;
        }
        item.number = candidateNumber;
        encounteredNumbers.add(candidateNumber);
      }
    });

    // You still have to fast-forward to the next unused number from the previous loop.
    while (encounteredNumbers.has(candidateNumber)) {
      candidateNumber++;
    }

    /**
     * This explicitly assigns numbers to those additional items whose
     * numbers are implicit.
     *
     * Note that the rules for doing so in the extension additions
     * differs from the rules for assigning numbers to implicitly-numbered
     * root items.
     */
    additionalEnumerations.forEach((item: EnumerationItem): void => {
      if (typeof item.number === 'undefined') {
        item.number = candidateNumber;
      } else if (typeof item.number === 'number') {
        candidateNumber = item.number + 1; // The candidate number must always be larger.
      }
    });
  }

  const items = rootEnumerations.concat(additionalEnumerations);
  items
    .map((item) => item.identifier)
    .forEach((item) => ctx.enumItems.add(item));

  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.EnumeratedType,
    type: {
      items,
      explicitlyExtensible: extensible,
      exception,
      selfContained,
      allItemsExplicitlyNumbered,
    },
  };
}
