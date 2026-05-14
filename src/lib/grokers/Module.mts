import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import Module from '../constructs/Module.mjs';
import TaggingMode from '../constructs/TaggingMode.mjs';
import grokDefinitiveIdentification from './DefinitiveIdentification.mjs';
import grokExports from './Exports.mjs';
import grokImports from './Imports.mjs';
import grokAssignment from './Assignment.mjs';
import type SymbolsFromModule from '../constructs/SymbolsFromModule.mjs';
import { type Assignment } from '../constructs/Assignment.mjs';

/**
 * `ModuleDefinition ::=
 *     ModuleIdentifier
 *     DEFINITIONS
 *     EncodingReferenceDefault
 *     TagDefault
 *     ExtensionDefault
 *     "::="
 *     BEGIN
 *     ModuleBody
 *     EncodingControlSections
 *     END`
 */
export default function grokModule(cst: Production, ctx: GrokContext): Module {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );

  if (components.length < 5) {
    throw new Error('Invalid Module.');
  }
  const ModuleIdentifier: Production = components[0];
  const modulereference: Production = ModuleIdentifier.children[0];
  const DefinitiveIdentification: Production | undefined =
    ModuleIdentifier.children.find(
      (child: Production): boolean =>
        child.type === ProductionType.DefinitiveIdentification
    );

  const name: string = text.slice(
    modulereference.location.startIndex,
    modulereference.location.endIndex
  );
  let encodingReference: string | undefined = undefined;
  let taggingMode: TaggingMode = TaggingMode.EXPLICIT;
  let extensibilityImplied: boolean = false; // Defaults to false;
  let imports: { [module: string]: SymbolsFromModule } = {};
  let _exports: { [identifier: string]: Assignment | undefined } | undefined;
  const assignments: { [identifier: string]: Assignment } = {};

  const di = DefinitiveIdentification
    ? grokDefinitiveIdentification(DefinitiveIdentification, ctx)
    : undefined;
  const [oid, iri] = di ? di : [undefined, undefined];
  let i: number = 2;
  // This might be a problem, because it is OPTIONAL.
  if (components[i].type === ProductionType.EncodingReferenceDefault) {
    if (components[i].location.startIndex !== components[i].location.endIndex) {
      encodingReference = text.slice(
        components[i].location.startIndex,
        components[i].location.endIndex
      );
    }
    i++;
  }

  if (components[i].type === ProductionType.TagDefault) {
    const tagDefault: string = text.slice(
      components[i].location.startIndex,
      components[i].location.endIndex
    );
    if (tagDefault.length === 0) {
      taggingMode = TaggingMode.EXPLICIT;
    } else if (tagDefault.indexOf('EXP') !== -1) {
      taggingMode = TaggingMode.EXPLICIT;
    } else if (tagDefault.indexOf('IMP') !== -1) {
      taggingMode = TaggingMode.IMPLICIT;
    } else if (tagDefault.indexOf('AUTO') !== -1) {
      taggingMode = TaggingMode.AUTOMATIC;
    } else {
      throw new Error('Unrecognized Tagging Mode.');
    }
    i++;
  }

  if (components[i].type === ProductionType.ExtensionDefault) {
    if (components[i].children.length > 0) {
      extensibilityImplied = true;
    } else {
      extensibilityImplied = false;
    }
    i++;
  }

  i += 2; // Skip ::= and BEGIN.

  if (components[i].type === ProductionType.ModuleBody) {
    components[i].children.forEach((child: Production): void => {
      switch (child.type) {
        case ProductionType.Exports: {
          _exports = grokExports(child, ctx);
          break;
        }
        case ProductionType.Imports: {
          imports = grokImports(child, ctx);
          break;
        }
        case ProductionType.AssignmentList: {
          ctx.currentModule = {
            ...ctx.currentModule,
            name,
            oid,
            iri,
            encodingReference,
            taggingMode,
            extensibilityImplied,
            imports,
            exports: _exports,
            assignments,
          };
          child.children
            .filter(
              (grandchild: Production): boolean =>
                grandchild.type === ProductionType.Assignment
            )
            .forEach((assignment: Production): void => {
              const a: Assignment = grokAssignment(assignment, ctx);
              if (a.identifier in assignments) {
                throw new Error(
                  `Duplicate assigned identifier '${a.identifier}'.`
                );
              }
              assignments[a.identifier] = a;
            });
          break;
        }
        default: {
          break;
        }
      }
    });
    i++;
  }

  return new Module(
    name,
    oid,
    iri,
    encodingReference,
    taggingMode,
    extensibilityImplied,
    imports,
    _exports,
    assignments,
    undefined,
    undefined,
    ctx.enumItems
  );
}
