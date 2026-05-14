import { type FixedTypeFieldVal } from './FixedTypeFieldVal.mjs';
import type OpenTypeFieldVal from './OpenTypeFieldVal.mjs';

/**
 * `ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal`
 */
export type ObjectClassFieldValue = FixedTypeFieldVal | OpenTypeFieldVal;
