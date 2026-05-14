import { literal, whitespace } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import productionTypeToTypeTypeMap from '../../maps/productionTypeToTypeTypeMap.js';

/**
 * @summary Efficient `FixedTypeValueFieldSpec` that avoids reparsing
 * @description
 * This parser avoids re-parsing the `valuefieldreference` and `Type` for all
 * possible variations of the `UNIQUE` or `ValueOptionalitySpec` that may
 * appear after.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * FixedTypeValueFieldSpec ::= valuefieldreference Type UNIQUE ? ValueOptionalitySpec ?
 * ```
 * @constant {Parser}
 */
export default new Parser(
  () => 'FixedTypeValueFieldSpec',
  (state: ParseContext): ParseContext => {
    const vfr: ParseContext = parserFor.valuefieldreference.execute(state);
    if (vfr.error) {
      return vfr;
    }
    const ws1: ParseContext = whitespace.execute(vfr);
    if (ws1.error) {
      return ws1;
    }
    const type_: ParseContext = parserFor.Type.execute(ws1);
    if (type_.error) {
      return type_;
    }

    const results = [vfr, ws1, type_];

    const ws2: ParseContext = whitespace.execute(type_);
    if (ws2.error) {
      return {
        ...type_,
        cst: new Production(
          ProductionType.FixedTypeValueFieldSpec,
          results.map((c) => c.cst)
        ),
      };
    }

    if (type_.cst.children[0].type === ProductionType.BuiltinType) {
      const BuiltinType = type_.cst.children[0];
      let innerType = BuiltinType.children[0];
      while (innerType.type === ProductionType.PrefixedType) {
        const TaggedOrEncodingPrefixedType = innerType.children[0];
        const TypeAfterPrefix =
          TaggedOrEncodingPrefixedType.children[
            TaggedOrEncodingPrefixedType.children.length - 1
          ];
        if (TypeAfterPrefix.children[0].type !== ProductionType.BuiltinType) {
          break;
        }
        const innerBuiltinType = TypeAfterPrefix.children[0];
        innerType = innerBuiltinType.children[0];
      }
      ws2.currentType = productionTypeToTypeTypeMap.get(innerType.type);
    }

    const unique: ParseContext = literal(ProductionType._UNIQUE).execute(ws2);
    if (unique.error) {
      const vos: ParseContext = parserFor.ValueOptionalitySpec.execute(ws2);
      if (vos.error) {
        return {
          ...type_,
          cst: new Production(
            ProductionType.FixedTypeValueFieldSpec,
            results.map((c) => c.cst)
          ),
        };
      } else {
        results.push(ws2);
        results.push(vos);
        return {
          ...vos,
          cst: new Production(
            ProductionType.FixedTypeValueFieldSpec,
            results.map((c) => c.cst)
          ),
        };
      }
    }

    results.push(unique);
    const ws3: ParseContext = whitespace.execute(unique);
    if (ws3.error) {
      return {
        ...unique,
        cst: new Production(
          ProductionType.FixedTypeValueFieldSpec,
          results.map((c) => c.cst)
        ),
      };
    }

    const vos: ParseContext = parserFor.ValueOptionalitySpec.execute(ws3);
    if (vos.error) {
      unique.currentType = undefined;
      return {
        ...unique,
        cst: new Production(
          ProductionType.FixedTypeValueFieldSpec,
          results.map((c) => c.cst)
        ),
      };
    }

    vos.currentType = undefined;
    return {
      ...vos,
      cst: new Production(
        ProductionType.FixedTypeValueFieldSpec,
        results.map((c) => c.cst)
      ),
    };
  }
);
