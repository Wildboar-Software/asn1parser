import type ChoiceType from './constructs/Types/ChoiceType.js';
import type NamedType from './constructs/NamedType.js';

/**
 * @summary Iterate over all `NamedType` alternatives within a `CHOICE` type.
 * @description
 * Yields all `NamedType` alternatives of a `CHOICE` type.
 * @param {ChoiceType} type_ The `CHOICE` type whose alternatives are to be
 *  yielded from iteration.
 * @yields {NamedType} An alternative of the `CHOICE` type.
 * @returns An `IterableIterator<NamedType>`.
 */
export default function* iterateOverAlternatives(
  type_: ChoiceType
): IterableIterator<NamedType> {
  const ratl = type_.rootAlternativeTypeList;
  const eaa = type_.extensionAdditionAlternatives ?? [];

  for (let i = 0; i < ratl.length; i++) {
    yield ratl[i];
  }

  for (let i = 0; i < eaa.length; i++) {
    const e = eaa[i];
    if ('alternativeTypeList' in e) {
      for (let j = 0; j < e.alternativeTypeList.length; j++) {
        yield e.alternativeTypeList[j];
      }
    } else {
      yield e;
    }
  }

  return;
}
