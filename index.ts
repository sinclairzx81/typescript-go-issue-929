// ----------------------------------------------------------------------------------
// Schema Types
// ----------------------------------------------------------------------------------
interface TSchema { kind: string, static: unknown }
interface TNever extends TSchema { kind: 'Never', static: unknown }
interface TUnion<Types extends TSchema[] = []> extends TSchema { kind: 'Union', anyOf: Types, static: unknown }
interface TTemplateLiteral<Types extends TSchema[] = []> extends TSchema { kind: 'TemplateLiteral', types: Types, static: string }
interface TLiteral<Value extends string = string> extends TSchema { kind: 'Literal', value: Value, static: unknown }

// ----------------------------------------------------------------------------------
// Utility Types
// ----------------------------------------------------------------------------------
type Assert<T, E> = T extends E ? T : never
type Ensure<T> = T extends infer U ? U : never
type UnionToIntersect<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;
type UnionLast<U> = UnionToIntersect<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
type UnionToTuple<U, L = UnionLast<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, L>>, L]

// ----------------------------------------------------------------------------------
// Inference
// ----------------------------------------------------------------------------------
type Static<Type extends TSchema> = Type['static']

// ----------------------------------------------------------------------------------
// Evaluation Types
// ----------------------------------------------------------------------------------
type TUnionResult<T extends TSchema[]> = T extends [] ? TNever : T extends [infer S] ? S : TUnion<T>
type TUnionTemplateLiteral<T extends TTemplateLiteral, S extends string = Static<T>> = Ensure<TUnionResult<Assert<UnionToTuple<{
  [K in S]: TLiteral<K>
}[S]>, TLiteral[]>>>