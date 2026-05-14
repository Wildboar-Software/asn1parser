import { choiceOf, recursiveParser } from '../generic/index.mjs';
import DefinitiveOID from './DefinitiveOID.mjs';
import DefinitiveOIDandIRI from './DefinitiveOIDandIRI.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinitiveIdentification ::= DefinitiveOID | DefinitiveOIDandIRI | empty`
 *
 * NOTE: Even though this can be empty, the empty alternative is ignored so that
 * the ModuleIdentifier parser can determine whether the whitespace following
 * the modulereference precedes a DefinitiveIdentification, or if it belongs to
 * another production, and hence, should remain unconsumed.
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [DefinitiveOIDandIRI, DefinitiveOID],
      ProductionType.DefinitiveIdentification
    )
);
