import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type IntegerValue } from '../../constructs/Values/IntegerValue.mjs';
import ProductionType from '../../ProductionType.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

// IntegerValue ::=
//     SignedNumber
// 	| identifier

export default function grokIntegerValue(
  cst: Production,
  ctx: GrokContext
): IntegerValue {
  const text: string = ctx.text;
  const base: number = ctx.textStartsAtOffset ?? 0;
  const subtext = text.slice(
    cst.children[0].location.startIndex - base,
    cst.children[0].location.endIndex - base,
  );
  if (cst.children[0].type === ProductionType.SignedNumber) {
    const SignedNumber: number = Number.parseInt(subtext, 10);
    if (
      Number.isNaN(SignedNumber) ||
      SignedNumber === Infinity ||
      SignedNumber === -Infinity
    ) {
      throw new ASN1SyntaxError(
        cst,
        `This cannot be converted to a JavaScript integer: '${subtext}'.`,
        ctx.currentModule.name,
      );
    }
    return SignedNumber;
  } else {
    return subtext;
  }
}
