import type Context from './Context.mjs';
import type ParserState from './ParserState.mjs';

/**
 * @summary The context to be passed between parsers
 * @description
 * Even though it may seem better to put `ParserState` within its own `state`
 * member, this single indirection may have dire consequences for performance.
 */
export default interface ParseContext extends Context, ParserState {}
