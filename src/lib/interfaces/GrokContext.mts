import type Context from './Context.js';
import type Module from '../constructs/Module.js';

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
}
