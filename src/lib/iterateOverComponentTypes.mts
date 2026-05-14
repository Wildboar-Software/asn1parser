import type SetOrSequenceType from './constructs/Types/SetOrSequenceType.mjs';
import { type ComponentType } from './constructs/ComponentType.mjs';

/**
 * @summary Iterate over all `ComponentType` alternatives within a `SET` or
 *  `SEQUENCE` type.
 * @description
 * Yields all `ComponentType` components of a `SET` or `SEQUENCE` type.
 * @param {SetOrSequenceType} type_ The `SET` or `SEQUENCE` type whose
 *  alternatives are to be yielded from iteration.
 * @yields {ComponentType} A component of the `SET` or `SEQUENCE` type.
 * @returns An `IterableIterator<ComponentType>`.
 */
export default function* iterateOverComponentTypes(
  type_: SetOrSequenceType
): IterableIterator<ComponentType> {
  const rctl1 = type_.rootComponentTypeList1 ?? [];
  const eal = type_.extensionAdditionList ?? [];
  const rctl2 = type_.rootComponentTypeList2 ?? [];

  for (let i = 0; i < rctl1.length; i++) {
    yield rctl1[i];
  }

  for (let i = 0; i < eal.length; i++) {
    const e = eal[i];
    if ('componentTypeList' in e) {
      for (let j = 0; j < e.componentTypeList.length; j++) {
        yield e.componentTypeList[j];
      }
    } else {
      yield e;
    }
  }

  for (let i = 0; i < rctl2.length; i++) {
    yield rctl2[i];
  }

  return;
}
