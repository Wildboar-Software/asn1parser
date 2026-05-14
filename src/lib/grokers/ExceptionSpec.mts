import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ExceptionIdentification } from '../constructs/ExceptionIdentification.mjs';
import grokDefined from './Defined.mjs';
import grokType from './Type.mjs';
import grokValue from './Value.mjs';

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
  const valueString: string = text.slice(
    xid.location.startIndex,
    xid.location.endIndex
  );
  switch (xid.children[0].type) {
    case ProductionType.SignedNumber: {
      const value: number = Number.parseInt(valueString, 10);
      if (!Number.isSafeInteger(value)) {
        throw new Error(
          `Could not convert ExceptionIdentification '${valueString}' to a signed integer.`
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
      throw new Error(
        `Unrecognized subtype of ExceptionIdentification '${xid.children[0].type}'.`
      );
    }
  }
}
