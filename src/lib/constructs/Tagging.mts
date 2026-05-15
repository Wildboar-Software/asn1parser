import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Tag from './Tag.mjs';

/** Tagging of an ASN.1 value / encoding. */
export default interface Tagging extends GrokedThing {
  /**
   * If `true`, explicitly tagged.
   * If `false`, implicitly tagged.
   *
   * A value of `undefined` means that the tag defers to the module's
   * default tagging mode.
   */
  explicit?: boolean;
  /** The tag itself. */
  tag: Tag;
}
