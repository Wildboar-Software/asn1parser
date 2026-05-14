import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type NameAndOrNumber } from '../constructs/NameAndOrNumber.mjs';

export default function grokDefinitiveOID(
  cst: Production,
  ctx: GrokContext
): NameAndOrNumber[] {
  const text: string = ctx.text;
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
      switch (grandchild.type) {
        case ProductionType.NameForm: {
          return {
            name: text.slice(
              grandchild.location.startIndex,
              grandchild.location.endIndex
            ),
          };
        }
        case ProductionType.DefinitiveNumberForm: {
          return {
            number: parseInt(
              text.slice(
                grandchild.location.startIndex,
                grandchild.location.endIndex
              ),
              10
            ),
          };
        }
        case ProductionType.DefinitiveNameAndNumberForm: {
          const nameAndNumber: string = text.slice(
            grandchild.location.startIndex,
            grandchild.location.endIndex
          );
          const indexOfFirstParentheses: number = nameAndNumber.indexOf('(');
          return {
            name: nameAndNumber.slice(0, indexOfFirstParentheses),
            number: parseInt(
              nameAndNumber.slice(indexOfFirstParentheses + 1, -1),
              10
            ),
          };
        }
        default: {
          throw new Error(
            `Unrecognized DefinitiveOIDComponent alternative ${grandchild.type}.`
          );
        }
      }
    });
}
