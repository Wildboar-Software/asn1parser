import { choiceOf, recursiveParser } from '../generic/index.js';
import DefinitiveOID from './DefinitiveOID.js';
import DefinitiveOIDandIRI from './DefinitiveOIDandIRI.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
