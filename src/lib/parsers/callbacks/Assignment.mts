import type Production from '../../Production.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import ProductionType from '../../ProductionType.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import ASN1ParserExpectationError from '../../errors/ASN1ParserExpectationError.mjs';

function findRef(
  prods: Production[],
  type_: ProductionType
): Production | undefined {
  return prods.find((p) => p.type === type_);
}

// Assignment ::=
//     TypeAssignment
// 	| ValueAssignment
// 	| XMLValueAssignment
// 	| ValueSetTypeAssignment
// 	| ObjectClassAssignment
// 	| ObjectAssignment
// 	| ObjectSetAssignment
// 	| ParameterizedAssignment

// ParameterizedAssignment ::=
//     ParameterizedTypeAssignment
//     | ParameterizedValueAssignment
//     | ParameterizedValueSetTypeAssignment
//     | ParameterizedObjectClassAssignment
//     | ParameterizedObjectAssignment
//     | ParameterizedObjectSetAssignment

/**
 * @summary The callback called upon parsing an `Assignment`
 * @description
 * When an `Assignment` is parsed, this adds the newly assigned identifier to
 * the parsing context's set of discovered identifiers and resets the parsing
 * context's `currentType` to `undefined`.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseAssignment = function onDidParseAssignment(ctx: ParseContext): void {
  if (ctx.cst.children.length !== 1) {
    throw new ASN1ParserExpectationError(
      `Assignment production had an invalid number (${ctx.cst.children.length}) of child CST nodes`,
      ctx.cst,
    );
  }
  const alt = ctx.cst.children[0];
  let ref: Production | undefined;
  switch (alt.type) {
    case ProductionType.TypeAssignment: {
      ref =
        findRef(alt.children, ProductionType.typereference) ??
        findRef(alt.children, ProductionType.objectclassreference);
      break;
    }
    case ProductionType.ValueAssignment:
    case ProductionType.XMLValueAssignment: {
      ref = findRef(alt.children, ProductionType.valuereference);
      break;
    }
    case ProductionType.ValueSetTypeAssignment: {
      ref =
        findRef(alt.children, ProductionType.typereference) ??
        findRef(alt.children, ProductionType.objectclassreference);
      break;
    }
    case ProductionType.ObjectClassAssignment: {
      ref = findRef(alt.children, ProductionType.objectclassreference);
      break;
    }
    case ProductionType.ObjectAssignment: {
      ref = findRef(alt.children, ProductionType.objectreference);
      break;
    }
    case ProductionType.ObjectSetAssignment: {
      ref = findRef(alt.children, ProductionType.objectsetreference);
      break;
    }
    case ProductionType.ParameterizedAssignment: {
      if (alt.children.length !== 1) {
        throw new ASN1ParserExpectationError(
          "Unexpected ParameterizedAssignment grammar",
          alt,
        );
      }
      const subalt = alt.children[0];
      switch (subalt.type) {
        case ProductionType.ParameterizedTypeAssignment: {
          ref =
            findRef(subalt.children, ProductionType.typereference) ??
            findRef(alt.children, ProductionType.objectclassreference);
          break;
        }
        case ProductionType.ParameterizedValueAssignment: {
          ref = findRef(subalt.children, ProductionType.valuereference);
          break;
        }
        case ProductionType.ParameterizedValueSetTypeAssignment: {
          ref =
            findRef(subalt.children, ProductionType.typereference) ??
            findRef(alt.children, ProductionType.objectclassreference);
          break;
        }
        case ProductionType.ParameterizedObjectClassAssignment: {
          ref = findRef(subalt.children, ProductionType.objectclassreference);
          break;
        }
        case ProductionType.ParameterizedObjectAssignment: {
          ref = findRef(subalt.children, ProductionType.objectreference);
          break;
        }
        case ProductionType.ParameterizedObjectSetAssignment: {
          ref =
            findRef(subalt.children, ProductionType.objectsetreference) ??
            findRef(alt.children, ProductionType.objectclassreference);
          break;
        }
        default: {
          throw new ASN1ParserExpectationError(
            "Unexpected ParameterizedAssignment alternative: " + subalt.type,
            subalt,
          );
        }
      }
      break;
    }
    default: {
      throw new ASN1ParserExpectationError(
        "Unexpected Assignment alternative: " + alt.type,
        alt,
      );
    }
  }
  if (ref) {
    const identifier = ctx.text.slice(
      ref.location.startIndex,
      ref.location.endIndex
    );
    ctx.discoveredIdentifiers.set(
      identifier,
      alt.type as unknown as AssignmentType
    );
  }
  ctx.currentType = undefined;
};
export default onDidParseAssignment;
