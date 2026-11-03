import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import grokDefined from '../Defined.mjs';
import type Defined from '../../constructs/Defined.mjs';
import type NamedNumber from '../../constructs/NamedNumber.mjs';
import { type Type } from '../../constructs/Type.mjs';

// BitStringType ::=
//     BIT STRING
//     | BIT STRING "{" NamedBitList "}"

// NamedBitList ::=
//     NamedBit
// 	| NamedBitList "," NamedBit

// NamedBit ::=
//     identifier "(" number ")"
// 	| identifier "(" DefinedValue ")"

export default function grok(cst: Production, ctx: GrokContext): Type {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );
  let selfContained: boolean = true;
  if (components[components.length - 1].type === ProductionType.curlyClosing) {
    const namedBitList: NamedNumber[] = components[components.length - 2].children
      .filter(
        (child: Production): boolean => child.type === ProductionType.NamedBit
      )
      .map((namedBit: Production) => {
        const namedBitComponents: Production[] = namedBit.children.filter(
          (child: Production): boolean =>
            child.type !== ProductionType.whitespace
        );
        const numberOrDefinedValue: string = text.slice(
          namedBitComponents[2].location.startIndex - base,
          namedBitComponents[2].location.endIndex - base
        );
        const numberValue: number = Number.parseInt(numberOrDefinedValue, 10);
        const number_: number | Defined = ((): number | Defined => {
          if (Number.isNaN(numberValue)) {
            selfContained = false;
            return grokDefined(namedBitComponents[2], ctx);
          } else {
            return numberValue;
          }
        })();
        return {
          identifier: text.slice(
            namedBitComponents[0].location.startIndex - base,
            namedBitComponents[0].location.endIndex - base
          ),
          number: number_,
          production: namedBit,
          productionType: ProductionType.NamedBit,
          text: text.slice(
            namedBit.location.startIndex - base,
            namedBit.location.endIndex - base
          ),
        };
      });
    return {
      text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
      typeType: TypeType.BitStringType,
      type: {
        namedBitList,
        selfContained,
      },
      production: cst,
    };
  } else {
    return {
      text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
      typeType: TypeType.BitStringType,
      type: {
        selfContained,
      },
      production: cst,
    };
  }
}
