import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import grokDefined from '../Defined.mjs';
import type NamedNumber from '../../constructs/NamedNumber.mjs';
import { type Type } from '../../constructs/Type.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

// IntegerType ::=
//     INTEGER
// 	| INTEGER "{" NamedNumberList "}"

// NamedNumberList ::=
//     NamedNumber
// 	| NamedNumberList "," NamedNumber

// NamedNumber ::=
//     identifier "(" SignedNumber ")"
// 	| identifier "(" DefinedValue ")"

// SignedNumber ::=
//     number
// 	| "-" number

// IntegerValue ::=
//     SignedNumber
// 	| identifier

export default function grok(cst: Production, ctx: GrokContext): Type {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  if (components.length === 1) {
    return {
      text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
      typeType: TypeType.IntegerType,
      type: {
        selfContained: true,
      },
      production: cst,
    };
  }

  let selfContained: boolean = true;
  const NamedNumberList: Production = components[2];
  const namedNumbers: NamedNumber[] = NamedNumberList.children
    .filter(
      (child: Production): boolean => child.type === ProductionType.NamedNumber
    )
    .map((nn: Production) => {
      const nnComponents: Production[] = nn.children.filter(
        (child: Production): boolean => child.type !== ProductionType.whitespace
      );
      const identifier: string = text.slice(
        nnComponents[0].location.startIndex - base,
        nnComponents[0].location.endIndex - base
      );
      const valueString: string = text.slice(
        nnComponents[2].location.startIndex - base,
        nnComponents[2].location.endIndex - base
      );
      if (nnComponents[2].type === ProductionType.SignedNumber) {
        const value: number = Number.parseInt(valueString, 10);
        if (!Number.isSafeInteger(value)) {
          throw new ASN1SyntaxError(
            nnComponents[2],
            `Could not safely convert '${valueString}' to an native Javascript integer`,
            ctx.currentModule.name,
          );
        }
        return {
          identifier,
          number: value,
          production: nn,
          productionType: ProductionType.NamedNumber,
          text: text.slice(
            nn.location.startIndex - base,
            nn.location.endIndex - base
          ),
        };
      } else {
        selfContained = false;
        return {
          identifier,
          number: grokDefined(nnComponents[2], ctx),
          production: nn,
          productionType: ProductionType.NamedNumber,
          text: text.slice(
            nn.location.startIndex - base,
            nn.location.endIndex - base
          ),
        };
      }
    });

  return {
    text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
    typeType: TypeType.IntegerType,
    type: {
      namedNumberList: namedNumbers,
      selfContained,
    },
  };
}
