import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import TypeType from '../../constructs/TypeType.js';
import grokDefined from '../Defined.js';
import { type Type } from '../../constructs/Type.js';

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
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  if (components.length === 1) {
    return {
      text: text.slice(cst.location.startIndex, cst.location.endIndex),
      typeType: TypeType.IntegerType,
      type: {
        selfContained: true,
      },
    };
  }

  let selfContained: boolean = true;
  const NamedNumberList: Production = components[2];
  const namedNumbers = NamedNumberList.children
    .filter(
      (child: Production): boolean => child.type === ProductionType.NamedNumber
    )
    .map((nn: Production) => {
      const nnComponents: Production[] = nn.children.filter(
        (child: Production): boolean => child.type !== ProductionType.whitespace
      );
      const identifier: string = text.slice(
        nnComponents[0].location.startIndex,
        nnComponents[0].location.endIndex
      );
      const valueString: string = text.slice(
        nnComponents[2].location.startIndex,
        nnComponents[2].location.endIndex
      );
      if (nnComponents[2].type === ProductionType.SignedNumber) {
        const value: number = Number.parseInt(valueString, 10);
        if (!Number.isSafeInteger(value)) {
          throw new Error(`Unable to parse INTEGER from '${valueString}'.`);
        }
        return {
          identifier,
          number: value,
        };
      } else {
        selfContained = false;
        return {
          identifier,
          number: grokDefined(nnComponents[2], ctx),
        };
      }
    });

  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.IntegerType,
    type: {
      namedNumberList: namedNumbers,
      selfContained,
    },
  };
}
