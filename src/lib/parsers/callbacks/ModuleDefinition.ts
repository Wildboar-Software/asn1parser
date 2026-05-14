import type ParseContext from '../../interfaces/ParseContext.js';

/**
 * @summary The callback called upon parsing a `ModuleDefinition`
 * @description
 * This callback clears most contextual information from the parsing state.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export default function onDidParseModuleDefinition(ctx: ParseContext): void {
  /**
   * It is not explicitly forbidden in the ASN.1 specifications for the
   * module name to be identical to an assigned identifier, but I figured it
   * would be a good idea to prohibit it. However, the module
   * `CMSProfileAttributes`, which was defined by the International
   * Telecommunications Union (ITU) itself, defines an object set whose name
   * collides with the module name. I take this to mean that this behavior
   * is legitimate.
   */
  // const ModuleIdentifier = ctx.cst.children[0];
  // const modulereference = ModuleIdentifier.children[0];
  // const loc = modulereference.location;
  // const moduleName: string = ctx.text.slice(loc.startIndex, loc.endIndex);
  // if (ctx.discoveredIdentifiers.has(moduleName)) {
  //     throw new Error(
  //         "Assigned reference cannot have the same name as the module in "
  //         + `which it is defined, '${moduleName}'.`,
  //     );
  // }
  ctx.definedEnumItems.clear();
  ctx.definedSyntaxTokens.clear();
  ctx.discoveredIdentifiers.clear();
}
