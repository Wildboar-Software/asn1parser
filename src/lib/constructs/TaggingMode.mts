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
 */
enum TaggingMode {
  EXPLICIT = 'EXPLICIT',
  IMPLICIT = 'IMPLICIT',
  AUTOMATIC = 'AUTOMATIC',
}

export default TaggingMode;
