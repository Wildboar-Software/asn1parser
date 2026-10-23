/**
 * Tagging mode for an ASN.1 module.
 *
 * `EXPLICIT` means that tagged values are included with an inner and
 * outer tag.
 *
 * `IMPLICIT` means that the outermost tag replaces the inner tag. This
 * produces a more compact encoding, but it is less self-describing.
 *
 * `AUTOMATIC` means that the components of a `SET`, `SEQUENCE`, or `CHOICE`
 * have context-specific tags applied in ascending order (according to some
 * complicated rules).
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const TaggingMode = {
  EXPLICIT: 'EXPLICIT',
  IMPLICIT: 'IMPLICIT',
  AUTOMATIC: 'AUTOMATIC',
} as const;

export type TaggingMode = (typeof TaggingMode)[keyof typeof TaggingMode];

export namespace TaggingMode {
  export type EXPLICIT = (typeof TaggingMode)['EXPLICIT'];
  export type IMPLICIT = (typeof TaggingMode)['IMPLICIT'];
  export type AUTOMATIC = (typeof TaggingMode)['AUTOMATIC'];
}

export default TaggingMode;
