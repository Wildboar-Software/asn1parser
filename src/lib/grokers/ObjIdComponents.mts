import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import { type ObjIdComponents } from '../constructs/ObjIdComponents.mjs';
import ProductionType from '../ProductionType.mjs';
import grokDefinedValue from './Defined.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

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
    throw new ASN1SyntaxError(
      cst,
      `Did not expect ${cst.children.length} subproductions in ObjIdComponents.`,
      ctx.currentModule.name,
    );
  }
  const innercst = cst.children[0];
  switch (innercst.type) {
    case ProductionType.NameForm: {
        const name = text.slice(
          cst.children[0].location.startIndex,
          cst.children[0].location.endIndex
        );
      return {
        text: name,
        name,
        production: innercst,
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
          throw new ASN1SyntaxError(
            NumberForm.children[0],
            'Non-integral NumberForm',
            ctx.currentModule.name,
          );
        }
        return {
          text: numstr,
          number: num,
          production: innercst,
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
          production: innercst,
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
          throw new ASN1SyntaxError(
            NumberForm.children[0],
            'Non-integral NumberForm',
            ctx.currentModule.name,
          );
        }
        return {
          text: text.slice(
            NameAndNumberForm.location.startIndex,
            NameAndNumberForm.location.endIndex
          ),
          name: identifier,
          number: num,
          production: innercst,
        };
      }
      break;
    }
    case ProductionType.DefinedValue: {
      return grokDefinedValue(cst.children[0], ctx);
    }
    default: {
      throw new ASN1SyntaxError(
        cst,
        `Unrecognized ObjIdComponents alternative ${cst.children[0].type}.`,
        ctx.currentModule.name,
      );
    }
  }
}
