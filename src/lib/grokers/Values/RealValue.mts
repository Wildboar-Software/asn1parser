import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type RealValue } from '../../constructs/Values/RealValue.mjs';
import ProductionType from '../../ProductionType.mjs';
import grokSetOrSequenceValue from './SetOrSequenceValue.mjs';
import { type IntegerValue } from '../../constructs/Values/IntegerValue.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

// RealValue ::=
//     NumericRealValue
// 	| SpecialRealValue

// NumericRealValue ::=
//     realnumber
// 	| "-" realnumber
// 	| SequenceValue

// SpecialRealValue ::=
//     PLUS-INFINITY
// 	| MINUS-INFINITY
// 	| NOT-A-NUMBER

// type RealValue = number | {
//     mantissa: number;
//     base: 2 | 10;
//     exponent: number;
// };

export default function grokRealValue(
  cst: Production,
  ctx: GrokContext
): RealValue {
  const text: string = ctx.text;
  if (cst.children.length !== 1) {
    throw new ASN1SyntaxError(
      cst,
      `Encountered RealValue composed of ${cst.children.length} Productions.`,
      ctx.currentModule.name,
    );
  }
  if (cst.children[0].children.length < 1) {
    throw new ASN1SyntaxError(
      cst,
      'Encountered RealValue child production composed of zero productions.',
      ctx.currentModule.name,
    );
  }
  if (cst.children[0].type === ProductionType.NumericRealValue) {
    const NumericRealValue: Production = cst.children[0];
    if (
      NumericRealValue.children[0].type === ProductionType.realnumber ||
      NumericRealValue.children[0].type === ProductionType.hyphen
    ) {
      const numStr: string = text
        .slice(
          NumericRealValue.children[0].location.startIndex,
          NumericRealValue.children[NumericRealValue.children.length - 1]
            .location.endIndex
        )
        .replace(/\s+/gu, '');
      const num: number = Number.parseFloat(numStr);
      if (Number.isNaN(num) || !Number.isFinite(num)) {
        throw new ASN1SyntaxError(
          cst,
          `Incorrectly groked RealValue '${numStr}'.`,
          ctx.currentModule.name,
        );
      }
      return num;
    } else if (
      NumericRealValue.children[0].type === ProductionType.SequenceValue
    ) {
      const seq = grokSetOrSequenceValue(NumericRealValue.children[0], ctx);
      let mantissa!: IntegerValue;
      let base!: IntegerValue;
      let exponent!: IntegerValue;
      seq.forEach((namedValue) => {
        switch (namedValue.identifier.toLowerCase()) {
          case 'mantissa': {
            mantissa = namedValue.value.value as IntegerValue;
            break;
          }
          case 'base': {
            base = namedValue.value.value as IntegerValue;
            break;
          }
          case 'exponent': {
            exponent = namedValue.value.value as IntegerValue;
            break;
          }
          default: {
            break;
          }
        }
      });
      /**
       * Warning: this might actually return a non-number, type, but this
       * is such an edge case that, frankly, I am not even going to deal with it.
       */
      return {
        mantissa,
        exponent,
        base,
      };
    } else {
      throw new ASN1SyntaxError(
        cst,
        `Unrecognized NumericRealValue child production ${NumericRealValue.children[0].type}.`,
        ctx.currentModule.name,
      );
    }
  } else if (cst.children[0].type === ProductionType.SpecialRealValue) {
    const SpecialRealValue: Production = cst.children[0];
    if (SpecialRealValue.children[0].type === ProductionType._PLUS_INFINITY) {
      return Infinity;
    } else if (
      SpecialRealValue.children[0].type === ProductionType._MINUS_INFINITY
    ) {
      return -Infinity;
    } else if (
      SpecialRealValue.children[0].type === ProductionType._NOT_A_NUMBER
    ) {
      return NaN;
    } else {
      throw new ASN1SyntaxError(
        SpecialRealValue,
        `Unrecognized SpecialRealValue child production ${SpecialRealValue.children[0].type}.`,
        ctx.currentModule.name,
      );
    }
  } else {
    throw new ASN1SyntaxError(
      cst,
      `Unrecognized RealValue child production ${cst.children[0].type}.`,
      ctx.currentModule.name,
    );
  }
}
