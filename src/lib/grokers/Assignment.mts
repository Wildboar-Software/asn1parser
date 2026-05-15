import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type Assignment } from '../constructs/Assignment.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import grokValueAssignment from './Assignments/ValueAssignment.mjs';
import grokValueSetTypeAssignment from './Assignments/ValueSetTypeAssignment.mjs';
import grokTypeAssignment from './Assignments/TypeAssignment.mjs';
import grokObjectAssignment from './Assignments/ObjectAssignment.mjs';
import grokObjectSetAssignment from './Assignments/ObjectSetAssignment.mjs';
import grokObjectClassAssignment from './Assignments/ObjectClassAssignment.mjs';

export default function grokAssignment(
  cst: Production,
  ctx: GrokContext
): Assignment {
  const text: string = ctx.text;
  const assignmentType: AssignmentType = ((): AssignmentType => {
    switch (cst.children[0].type) {
      case ProductionType.TypeAssignment: {
        return AssignmentType.TypeAssignment;
      }
      case ProductionType.ValueAssignment: {
        return AssignmentType.ValueAssignment;
      }
      case ProductionType.XMLValueAssignment: {
        return AssignmentType.XMLValueAssignment;
      }
      case ProductionType.ValueSetTypeAssignment: {
        return AssignmentType.ValueSetTypeAssignment;
      }
      case ProductionType.ObjectClassAssignment: {
        return AssignmentType.ObjectClassAssignment;
      }
      case ProductionType.ObjectAssignment: {
        return AssignmentType.ObjectAssignment;
      }
      case ProductionType.ObjectSetAssignment: {
        return AssignmentType.ObjectSetAssignment;
      }
      case ProductionType.ParameterizedAssignment: {
        switch (cst.children[0].children[0].type) {
          case ProductionType.ParameterizedTypeAssignment: {
            return AssignmentType.ParameterizedTypeAssignment;
          }
          case ProductionType.ParameterizedValueAssignment: {
            return AssignmentType.ParameterizedValueAssignment;
          }
          case ProductionType.ParameterizedValueSetTypeAssignment: {
            return AssignmentType.ParameterizedValueSetTypeAssignment;
          }
          case ProductionType.ParameterizedObjectClassAssignment: {
            return AssignmentType.ParameterizedObjectClassAssignment;
          }
          case ProductionType.ParameterizedObjectAssignment: {
            return AssignmentType.ParameterizedObjectAssignment;
          }
          case ProductionType.ParameterizedObjectSetAssignment: {
            return AssignmentType.ParameterizedObjectSetAssignment;
          }
          default: {
            throw new Error('Unrecognized AssignmentType.');
          }
        }
      }
      default: {
        throw new Error('Unrecognized AssignmentType.');
      }
    }
  })();

  const assignment: Production = cst.children[0];
  switch (assignmentType) {
    case AssignmentType.ParameterizedTypeAssignment: {
      const result = grokTypeAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.TypeAssignment: {
      const result = grokTypeAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ParameterizedValueSetTypeAssignment: {
      const result = grokValueSetTypeAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ValueSetTypeAssignment: {
      const result = grokValueSetTypeAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ParameterizedValueAssignment: {
      const result = grokValueAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ValueAssignment: {
      const result = grokValueAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ParameterizedObjectClassAssignment: {
      const result = grokObjectClassAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ObjectClassAssignment: {
      const result = grokObjectClassAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ParameterizedObjectAssignment: {
      const result = grokObjectAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ObjectAssignment: {
      const result = grokObjectAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ParameterizedObjectSetAssignment: {
      const result = grokObjectSetAssignment(assignment.children[0], ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.ObjectSetAssignment: {
      const result = grokObjectSetAssignment(assignment, ctx);
      result.production = assignment;
      return result;
    }
    case AssignmentType.XMLValueAssignment: {
      const reference: Production | undefined = assignment.children.find(
        (child: Production): boolean =>
          child.type === ProductionType.valuereference
      );
      if (!reference) {
        throw new Error('No refererence defined.');
      }
      const assignmentOperator: Production | undefined =
        assignment.children.find(
          (child: Production): boolean =>
            child.type === ProductionType.assignment
        );
      if (!assignmentOperator) {
        throw new Error('No assignment operator found.');
      }
      return {
        identifier: text.slice(
          reference.location.startIndex,
          reference.location.endIndex
        ),
        assignmentType: assignmentType,
        leftHandSide: text.slice(
          cst.location.startIndex,
          assignmentOperator.location.startIndex
        ),
        rightHandSide: text.slice(
          assignmentOperator.location.endIndex,
          cst.location.endIndex
        ),
        dependencies: {},
        production: assignment,
      };
    }
    default: {
      throw new Error(`Unrecognized AssignmentType '${assignmentType}'.`);
    }
  }
}
