import {
  anythingUntil,
  choiceOf,
  literal,
  recursiveParser,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * From ITU X.680-2015, Section 54.4:
 * "The "EncodingInstructionAssignmentList" production and the associated
 * semantics is specified in the Recommendation | International Standard
 * identified by the "encodingreference" (see Annex E) and can consist of any
 * sequence of ASN.1 lexical items (including comment, cstring and white-space)
 * except the lexical items END and ENCODING-CONTROL, which will not appear in
 * an "EncodingInstructionAssignmentList"."
 */
export const EncodingInstructionAssignmentList: Parser = recursiveParser(
  (): Parser =>
    anythingUntil(
      ProductionType.EncodingInstructionAssignmentList,
      choiceOf([
        literal(ProductionType._END),
        literal(ProductionType._ENCODING_CONTROL),
      ])
    )
);
export default EncodingInstructionAssignmentList;
