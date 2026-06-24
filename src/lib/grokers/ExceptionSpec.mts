import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ExceptionIdentification } from '../constructs/ExceptionIdentification.mjs';
import grokDefined from './Defined.mjs';
import grokType from './Type.mjs';
import grokValue from './Value.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

// ExceptionSpec ::=
//     "!" ExceptionIdentification
// 	| empty

// ExceptionIdentification ::=
//     SignedNumber
// 	| DefinedValue
// 	| Type ":" Value

export default function grok(
  cst: Production,
  ctx: GrokContext
): ExceptionIdentification | undefined {
  const text: string = ctx.text;
  if (cst.children.length === 0) {
    return undefined;
  }
  const xid: Production = cst.children[cst.children.length - 1];
  const base: number = ctx.textStartsAtOffset ?? 0;
  const valueString: string = text.slice(
    xid.location.startIndex - base,
    xid.location.endIndex - base,
  );
  switch (xid.children[0].type) {
    case ProductionType.SignedNumber: {
      const value: number = Number.parseInt(valueString, 10);
      if (!Number.isSafeInteger(value)) {
        throw new ASN1SyntaxError(
          cst,
          `Could not convert ExceptionIdentification '${valueString}' to a signed integer.`,
          ctx.currentModule.name,
        );
      }
      return value;
    }
    case ProductionType.DefinedValue: {
      return grokDefined(xid.children[0], ctx);
    }
    case ProductionType.Type: {
      const Type: Production = xid.children[0];
      const Value: Production = xid.children[xid.children.length - 1];
      return [grokType(Type, ctx), grokValue(Value, ctx)];
    }
    default: {
      throw new ASN1SyntaxError(
        xid.children[0],
        `Unrecognized subtype of ExceptionIdentification '${xid.children[0].type}'.`,
        ctx.currentModule.name,
      );
    }
  }
}
