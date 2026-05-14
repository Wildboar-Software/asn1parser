import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type Assignment } from '../constructs/Assignment.js';
import AssignmentType from '../constructs/AssignmentType.js';
import grokValueAssignment from './Assignments/ValueAssignment.js';
import grokValueSetTypeAssignment from './Assignments/ValueSetTypeAssignment.js';
import grokTypeAssignment from './Assignments/TypeAssignment.js';
import grokObjectAssignment from './Assignments/ObjectAssignment.js';
import grokObjectSetAssignment from './Assignments/ObjectSetAssignment.js';
import grokObjectClassAssignment from './Assignments/ObjectClassAssignment.js';

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
      return grokTypeAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.TypeAssignment: {
      return grokTypeAssignment(assignment, ctx);
    }
    case AssignmentType.ParameterizedValueSetTypeAssignment: {
      return grokValueSetTypeAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.ValueSetTypeAssignment: {
      return grokValueSetTypeAssignment(assignment, ctx);
    }
    case AssignmentType.ParameterizedValueAssignment: {
      return grokValueAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.ValueAssignment: {
      return grokValueAssignment(assignment, ctx);
    }
    case AssignmentType.ParameterizedObjectClassAssignment: {
      return grokObjectClassAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.ObjectClassAssignment: {
      return grokObjectClassAssignment(assignment, ctx);
    }
    case AssignmentType.ParameterizedObjectAssignment: {
      return grokObjectAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.ObjectAssignment: {
      return grokObjectAssignment(assignment, ctx);
    }
    case AssignmentType.ParameterizedObjectSetAssignment: {
      return grokObjectSetAssignment(assignment.children[0], ctx);
    }
    case AssignmentType.ObjectSetAssignment: {
      return grokObjectSetAssignment(assignment, ctx);
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
      };
    }
    default: {
      throw new Error(`Unrecognized AssignmentType '${assignmentType}'.`);
    }
  }
}
