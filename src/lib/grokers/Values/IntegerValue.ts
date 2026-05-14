import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type IntegerValue } from '../../constructs/Values/IntegerValue.js';
import ProductionType from '../../ProductionType.js';

// IntegerValue ::=
//     SignedNumber
// 	| identifier

export default function grokIntegerValue(
  cst: Production,
  ctx: GrokContext
): IntegerValue {
  const text: string = ctx.text;
  if (cst.children[0].type === ProductionType.SignedNumber) {
    const SignedNumber: number = Number.parseInt(
      text.slice(
        cst.children[0].location.startIndex,
        cst.children[0].location.endIndex
      ),
      10
    );
    if (
      Number.isNaN(SignedNumber) ||
      SignedNumber === Infinity ||
      SignedNumber === -Infinity
    ) {
      throw new Error(
        "This cannot be converted to a JavaScript number: '" +
          text.slice(
            cst.children[0].location.startIndex,
            cst.children[0].location.endIndex
          ) +
          "'."
      );
    }
    return SignedNumber;
  } else {
    return text.slice(
      cst.children[0].location.startIndex,
      cst.children[0].location.endIndex
    );
  }
}
