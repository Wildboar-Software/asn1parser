import { choiceOf, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ComponentTypeLists_1_2_and_3 from '../optimized/ComponentTypeLists_1_2_and_3.mjs';
import ComponentTypeLists_4_and_5 from '../optimized/ComponentTypeLists_4_and_5.mjs';

/**
 * Custom parsers are used here to avoid the extreme waste of re-reading
 * the leading components of each possible sequence repeatedly. Implementing
 * custom parsers for this production alone has halved parsing time for some
 * files, with even bigger improvements for others.
 *
 * `ComponentTypeLists ::=
 *   RootComponentTypeList
 *   | RootComponentTypeList "," ExtensionAndException ExtensionAdditions OptionalExtensionMarker
 *   | RootComponentTypeList "," ExtensionAndException ExtensionAdditions ExtensionEndMarker "," RootComponentTypeList
 *   | ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
 *   | ExtensionAndException ExtensionAdditions OptionalExtensionMarker`
 */
export const ComponentTypeLists: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      ComponentTypeLists_1_2_and_3, // Custom parser for options 1, 2, and 3.
      ComponentTypeLists_4_and_5, // Custom parser for options 4 and 5.
    ])
);
export default ComponentTypeLists;
