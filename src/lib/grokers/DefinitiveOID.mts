import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type NameAndOrNumber } from '../constructs/NameAndOrNumber.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

export default function grokDefinitiveOID(
  cst: Production,
  ctx: GrokContext
): NameAndOrNumber[] {
  const text: string = ctx.text;
  const base: number = ctx.textStartsAtOffset ?? 0;
  return cst.children
    .slice(1, -1) // Removing the leading and trailing curlies.
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )[0]
    .children // DefinitiveObjIdComponents and whitespace
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )
    .map((child: Production): Production => child.children[0])
    .map((grandchild: Production): NameAndOrNumber => {
      const granchildText = text.slice(
        grandchild.location.startIndex - base,
        grandchild.location.endIndex - base,
      );
      switch (grandchild.type) {
        case ProductionType.NameForm: {
          return {
            name: granchildText,
            production: grandchild,
            productionType: grandchild.type,
          };
        }
        case ProductionType.DefinitiveNumberForm: {
          return {
            number: parseInt(granchildText, 10),
            production: grandchild,
            productionType: grandchild.type,
          };
        }
        case ProductionType.DefinitiveNameAndNumberForm: {
          const nameAndNumber: string = granchildText;
          const indexOfFirstParentheses: number = nameAndNumber.indexOf('(');
          return {
            name: nameAndNumber.slice(0, indexOfFirstParentheses),
            number: parseInt(
              nameAndNumber.slice(indexOfFirstParentheses + 1, -1),
              10
            ),
            production: grandchild,
            productionType: grandchild.type,
          };
        }
        default: {
          throw new ASN1SyntaxError(
            grandchild,
            `Unrecognized DefinitiveObjIdComponent alternative ${grandchild.type}.`,
            ctx.currentModule.name,
          );
        }
      }
    });
}
