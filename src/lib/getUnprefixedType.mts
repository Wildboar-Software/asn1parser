import { type Type } from './constructs/Type.mjs';
import TypeType from './constructs/TypeType.mjs';

/**
 * @summary Strip all prefixes from a `Type`.
 * @description
 * Recursively strip prefixes from a `Type` until there are no more prefixes.
 * @param {Type} t The type whose prefixes are to be stripped.
 * @returns The `Type` that immediately within the last `PrefixedType`.
 */
export default function getUnprefixedType(t: Type): Type {
  let innerType = t;
  while (innerType.typeType === TypeType.PrefixedType) {
    innerType = innerType.type;
  }
  return innerType;
}
