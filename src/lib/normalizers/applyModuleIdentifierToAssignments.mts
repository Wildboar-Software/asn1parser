import { type Assignment } from '../constructs/Assignment.mjs';
import type Module from '../constructs/Module.mjs';

/**
 * @summary Applies the module identifier to each assignment it defines.
 * @description
 * This function applies module-identifying information to every assignment that
 * module defines. This is useful for making assignment AST nodes more
 * independent of the modules in which they were defined.
 * @param {Module} mod The ASN.1 module whose assignments are to be annotated
 *  with module information.
 * @function
 */
export default function applyModuleIdentifierToAssignments(mod: Module): void {
  Object.values(mod.assignments).forEach((assn: Assignment): void => {
    assn.module = {
      name: mod.name,
    };
  });
}
