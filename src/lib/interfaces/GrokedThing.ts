import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';

/**
 * @summary Any construct
 */
export default interface GrokedThing {
  /**
   * @summary The type of the production from which this construct was groked.
   * @member {ProductionType}
   */
  productionType?: ProductionType;

  /**
   * @summary The original ASN.1 text that composed this construct
   * @member {string}
   */
  text?: string;

  /**
   * @summary The `Production` that corresponds to this construct.
   * @member {Production}
   */
  production?: Production;
}
