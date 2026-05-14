import { choiceOf, recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `BuiltinValue ::=
 *      BitStringValue
 *      | BooleanValue
 *      | CharacterStringValue
 *      | ChoiceValue
 *      | EmbeddedPDVValue
 *      | EnumeratedValue
 *      | ExternalValue
 *      | InstanceOfValue
 *      | IntegerValue
 *      | IRIValue
 *      | NullValue
 *      | ObjectIdentifierValue
 *      | OctetStringValue
 *      | RealValue
 *      | RelativeIRIValue
 *      | RelativeOIDValue
 *      | SequenceValue
 *      | SequenceOfValue
 *      | SetValue
 *      | SetOfValue
 *      | PrefixedValue
 *      | TimeValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.BitStringValue,
        parserFor.BooleanValue,
        /**
         * The alias here effectively removes `UnrestrictedCharacterStringValue` as
         * an option, which is an alias for `SequenceValue`.
         */
        aliasFor(
          ProductionType.CharacterStringValue,
          parserFor.RestrictedCharacterStringValue
        ),
        parserFor.ChoiceValue,
        // parserFor.EmbeddedPDVValue, // Just an alias for SequenceValue.
        /**
         * `EnumeratedValue` is just an `identifier`, so it must be commented out
         * so other productions that begin with an `identifier` can be attempted
         * first.
         */
        // parserFor.EnumeratedValue,
        // parserFor.ExternalValue, // Just an alias for SequenceValue.
        /**
         * InstanceOfValue cannot be used as an alternative, because it is simply
         * an alias for Value, so it will induce an infinite loop.
         */
        // parserFor.InstanceOfValue,
        parserFor.IntegerValue,
        parserFor.IRIValue,
        parserFor.NullValue,
        parserFor.ObjectIdentifierValue,
        parserFor.OctetStringValue,
        parserFor.RelativeIRIValue,
        parserFor.RelativeOIDValue,
        parserFor.SequenceValue,
        parserFor.SequenceOfValue,
        /**
         * The following two value alternatives are commented out because
         * SequenceValue and SequenceOfValue are identical, respectively.
         */
        // parserFor.SetValue,
        // parserFor.SetOfValue,
        /**
         * PrefixedValue cannot be used as an alternative, because it is simply
         * an alias for Value, so it will induce an infinite loop.
         */
        // parserFor.PrefixedValue,
        /**
         * This needs to go after SequenceValue or SetValue, because it contains
         * SequenceValue as an alternative.
         */
        parserFor.RealValue,
        parserFor.TimeValue,

        // Retracted
        // AnyValue (This is not parsed, because it is both retracted and excessively difficult to parse without bugs.)
      ],
      ProductionType.BuiltinValue
    )
);
