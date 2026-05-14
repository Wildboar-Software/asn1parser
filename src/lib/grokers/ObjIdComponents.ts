import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import { type ObjIdComponents } from '../constructs/ObjIdComponents.js';
import ProductionType from '../ProductionType.js';
import grokDefinedValue from './Defined.js';

// ObjIdComponents ::=
//     NameForm
// 	| NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

// NameForm ::=
//     identifier

// NumberForm ::=
//     number
// 	| DefinedValue

// NameAndNumberForm ::=
//     identifier "(" NumberForm ")"

export default function grokObjIdComponents(
  cst: Production,
  ctx: GrokContext
): ObjIdComponents {
  const text: string = ctx.text;
  if (cst.children.length !== 1) {
    throw new Error(
      `Did not expect ${cst.children.length} subproductions in ObjIdComponents.`
    );
  }
  switch (cst.children[0].type) {
    case ProductionType.NameForm: {
        const name = text.slice(
          cst.children[0].location.startIndex,
          cst.children[0].location.endIndex
        );
      return {
        text: name,
        name,
      };
    }
    case ProductionType.NumberForm: {
      const NumberForm: Production = cst.children[0];
      if (NumberForm.children[0].type === ProductionType.DefinedValue) {
        return grokDefinedValue(NumberForm.children[0], ctx);
      } else {
        const numstr = text.slice(
            NumberForm.children[0].location.startIndex,
            NumberForm.children[0].location.endIndex
        );
        // Assume it is a number
        const num: number = Number.parseInt(numstr, 10);
        if (Number.isNaN(num) || !Number.isInteger(num)) {
          throw new Error('Non-integral NumberForm');
        }
        return {
          text: numstr,
          number: num,
        };
      }
    }
    case ProductionType.NameAndNumberForm: {
      const NameAndNumberForm: Production = cst.children[0];
      const nonws: Production[] = NameAndNumberForm.children.filter(
        (child: Production): boolean => child.type !== ProductionType.whitespace
      );
      const identifier: string = text.slice(
        nonws[0].location.startIndex,
        nonws[0].location.endIndex
      );
      const NumberForm: Production = nonws[2];
      if (NumberForm.children[0].type === ProductionType.DefinedValue) {
        return {
          text: text.slice(
            NameAndNumberForm.location.startIndex,
            NameAndNumberForm.location.endIndex
          ),
          name: identifier,
          number: grokDefinedValue(NumberForm.children[0], ctx),
        };
      } else {
        // Assume it is a number
        const num: number = Number.parseInt(
          text.slice(
            NumberForm.children[0].location.startIndex,
            NumberForm.children[0].location.endIndex
          ),
          10
        );
        if (Number.isNaN(num) || !Number.isInteger(num)) {
          throw new Error('Non-integral NumberForm');
        }
        return {
          text: text.slice(
            NameAndNumberForm.location.startIndex,
            NameAndNumberForm.location.endIndex
          ),
          name: identifier,
          number: num,
        };
      }
      break;
    }
    case ProductionType.DefinedValue: {
      return grokDefinedValue(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized ObjIdComponents alternative ${cst.children[0].type}.`
      );
    }
  }
}
