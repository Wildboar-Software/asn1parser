import type GrokedThing from '../interfaces/GrokedThing.js';
import { type ActualParameter } from './ActualParameter.js';
import AssignmentType from './AssignmentType.js';

export default interface Defined extends GrokedThing {
  module?: string;
  reference: string;
  parameters?: ActualParameter[];
  assignmentType?: AssignmentType;

  /**
   * `undefined` if this does not refer to a parameter, otherwise, the index
   * of the parameter this refers to in the `ParameterList`.
   */
  parameterIndex?: number;

  /**
   * This is the same as `module`, except that `module` is meant to denote
   * what was present in the original defined thing, whereas `computedModule`
   * refers to the module to which it belongs if it is not explicitly stated.
   *
   * This distinction exists so that compiled references can correctly refer
   * to intra-modular references.
   */
  computedModule: string;
}
