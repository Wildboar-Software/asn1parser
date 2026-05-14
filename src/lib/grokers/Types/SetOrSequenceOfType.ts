import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import TypeType from '../../constructs/TypeType.js';
import grokType from '../Type.js';
// import grokConstraint from "../Constraint";
// import type Constraint from "../../constructs/Constraint";
import { type Type } from '../../constructs/Type.js';

// SequenceOfType ::= SEQUENCE OF Type | SEQUENCE OF NamedType
// SetOfType ::= SET OF Type | SET OF NamedType

// This may also be used to grok TypeWithConstraint

// TypeWithConstraint ::=
//     SET Constraint OF Type
//     | SET SizeConstraint OF Type
//     | SEQUENCE Constraint OF Type
//     | SEQUENCE SizeConstraint OF Type
//     | SET Constraint OF NamedType
//     | SET SizeConstraint OF NamedType
//     | SEQUENCE Constraint OF NamedType
//     | SEQUENCE SizeConstraint OF NamedType

// SizeConstraint ::= SIZE Constraint

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );

  const typeType: TypeType =
    cst.type === ProductionType.SequenceOfType ||
    (cst.type === ProductionType.TypeWithConstraint &&
      cst.children[0].type === ProductionType._SEQUENCE)
      ? TypeType.SequenceOfType
      : TypeType.SetOfType;

  const lastComponent: Production = components[components.length - 1];
  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType,
    type: {
      of:
        lastComponent.type === ProductionType.Type
          ? grokType(lastComponent, ctx)
          : {
              identifier: text.slice(
                lastComponent.children[0].location.startIndex,
                lastComponent.children[0].location.endIndex
              ),
              type: grokType(
                lastComponent.children[lastComponent.children.length - 1],
                ctx
              ),
            },
      // size,
    },
  };
}
