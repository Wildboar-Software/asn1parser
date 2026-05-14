import ProductionType from './ProductionType.mjs';
import type Location from  './interfaces/Location.mjs';

/**
 * @summary A node in the abstract syntax tree.
 * @description
 * A node in the abstract syntax tree, which corresponds to a grammatical
 * production used in the definition of the ASN.1 syntax.
 * @class
 */
export default class Production<Types extends ProductionType = ProductionType> {
  /**
   * @private
   * @member {Location}
   */
  private _location?: Location;

  /**
   * @public
   * @returns {Location}
   */
  get location(): Location {
    if (this._location) {
      return this._location;
    } else if (this.children.length > 0) {
      return {
        ...this.children[0].location,
        endIndex: this.children[this.children.length - 1].location.endIndex,
      };
    } else {
      /**
       * This should never happen, because the lexer should fill in every
       * lexeme with this information.
       */
      return {
        startIndex: -1,
        endIndex: -1,
        lineNumber: 1,
        columnNumber: 1,
      };
    }
  }

  /**
   * @param {Type} type The type of this production.
   * @param {Production[]} children The child productions that compose this
   *  production.
   * @param {Location} loc The location of this production within the original
   *  text.
   * @constructor
   */
  constructor(
    readonly type: Types,
    readonly children: Production[] = [],
    loc?: Location
  ) {
    this._location = loc;
  }
}
