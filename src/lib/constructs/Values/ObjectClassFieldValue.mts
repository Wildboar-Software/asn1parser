import { type FixedTypeFieldVal } from './FixedTypeFieldVal.js';
import type OpenTypeFieldVal from './OpenTypeFieldVal.js';

/**
 * `ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal`
 */
export type ObjectClassFieldValue = FixedTypeFieldVal | OpenTypeFieldVal;
