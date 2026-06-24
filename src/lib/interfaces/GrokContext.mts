import type Context from './Context.mjs';
import type Module from '../constructs/Module.mjs';

/**
 * @summary A context to pass between grokers
 */
export default interface GrokContext extends Context {
  /**
   * @summary The raw original text of the ASN.1.
   * @member
   */
  text: string;

  /**
   * @summary What is currently known about the current module.
   * @member
   */
  currentModule: Partial<Module>;

  /**
   * @summary All identified enum identifiers.
   * @deprecated
   */
  enumItems: Set<string>;

  /**
   * @summary If the groking takes place over a subset of the text, this is
   *  offset where the subset begins.
   */
  textStartsAtOffset?: number;
}
