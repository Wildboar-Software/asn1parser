/**
 * Diagnostic shown when a CHOICE alternative or SET/SEQUENCE component has a
 * type but no identifier.
 *
 * ITU-T X.208 (1988) and earlier allowed this form. X.680 requires
 * `NamedType ::= identifier Type` for every alternative and component.
 */
export const ANCIENT_NAMELESS_NAMED_TYPE_ERROR_MESSAGE =
  'Nameless CHOICE alternatives and SET or SEQUENCE components are an ancient ASN.1 syntax that is no longer supported. Each alternative or component must have an identifier before its type.';
