import type GrokedThing from '../interfaces/GrokedThing.js';
import type Tag from './Tag.js';

export default interface Tagging extends GrokedThing {
  /**
   * A value of `undefined` means that the tag defers to the module's
   * default tagging mode.
   */
  explicit?: boolean;
  tag: Tag;
}
