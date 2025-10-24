
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AdminUsers
 * 
 */
export type AdminUsers = $Result.DefaultSelection<Prisma.$AdminUsersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const YesNo: {
  y: 'y',
  n: 'n'
};

export type YesNo = (typeof YesNo)[keyof typeof YesNo]

}

export type YesNo = $Enums.YesNo

export const YesNo: typeof $Enums.YesNo

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AdminUsers
 * const adminUsers = await prisma.adminUsers.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AdminUsers
   * const adminUsers = await prisma.adminUsers.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.adminUsers`: Exposes CRUD operations for the **AdminUsers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUsers.findMany()
    * ```
    */
  get adminUsers(): Prisma.AdminUsersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AdminUsers: 'AdminUsers'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    zains?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "adminUsers"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AdminUsers: {
        payload: Prisma.$AdminUsersPayload<ExtArgs>
        fields: Prisma.AdminUsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          findFirst: {
            args: Prisma.AdminUsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          findMany: {
            args: Prisma.AdminUsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>[]
          }
          create: {
            args: Prisma.AdminUsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          createMany: {
            args: Prisma.AdminUsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminUsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          update: {
            args: Prisma.AdminUsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          deleteMany: {
            args: Prisma.AdminUsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUsersPayload>
          }
          aggregate: {
            args: Prisma.AdminUsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUsers>
          }
          groupBy: {
            args: Prisma.AdminUsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUsersCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    adminUsers?: AdminUsersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model AdminUsers
   */

  export type AggregateAdminUsers = {
    _count: AdminUsersCountAggregateOutputType | null
    _avg: AdminUsersAvgAggregateOutputType | null
    _sum: AdminUsersSumAggregateOutputType | null
    _min: AdminUsersMinAggregateOutputType | null
    _max: AdminUsersMaxAggregateOutputType | null
  }

  export type AdminUsersAvgAggregateOutputType = {
    idUser: number | null
    idOffice: number | null
  }

  export type AdminUsersSumAggregateOutputType = {
    idUser: number | null
    idOffice: number | null
  }

  export type AdminUsersMinAggregateOutputType = {
    idUser: number | null
    userName: string | null
    password: string | null
    fullName: string | null
    idEmployee: string | null
    idPosition: string | null
    position: string | null
    address: string | null
    telpon: string | null
    whatsapp: string | null
    whatsappNotif: $Enums.YesNo | null
    apps: string | null
    idAppsGroupDefault: string | null
    idOffice: number | null
    email: string | null
    admin: $Enums.YesNo | null
    active: $Enums.YesNo | null
    created: Date | null
    updated: Date | null
    expired: Date | null
    lastLogin: Date | null
    idEntitas: string | null
    style: string | null
    foto: string | null
    session: string | null
  }

  export type AdminUsersMaxAggregateOutputType = {
    idUser: number | null
    userName: string | null
    password: string | null
    fullName: string | null
    idEmployee: string | null
    idPosition: string | null
    position: string | null
    address: string | null
    telpon: string | null
    whatsapp: string | null
    whatsappNotif: $Enums.YesNo | null
    apps: string | null
    idAppsGroupDefault: string | null
    idOffice: number | null
    email: string | null
    admin: $Enums.YesNo | null
    active: $Enums.YesNo | null
    created: Date | null
    updated: Date | null
    expired: Date | null
    lastLogin: Date | null
    idEntitas: string | null
    style: string | null
    foto: string | null
    session: string | null
  }

  export type AdminUsersCountAggregateOutputType = {
    idUser: number
    userName: number
    password: number
    fullName: number
    idEmployee: number
    idPosition: number
    position: number
    address: number
    telpon: number
    whatsapp: number
    whatsappNotif: number
    apps: number
    idAppsGroupDefault: number
    idOffice: number
    email: number
    admin: number
    active: number
    created: number
    updated: number
    expired: number
    lastLogin: number
    idEntitas: number
    style: number
    foto: number
    session: number
    _all: number
  }


  export type AdminUsersAvgAggregateInputType = {
    idUser?: true
    idOffice?: true
  }

  export type AdminUsersSumAggregateInputType = {
    idUser?: true
    idOffice?: true
  }

  export type AdminUsersMinAggregateInputType = {
    idUser?: true
    userName?: true
    password?: true
    fullName?: true
    idEmployee?: true
    idPosition?: true
    position?: true
    address?: true
    telpon?: true
    whatsapp?: true
    whatsappNotif?: true
    apps?: true
    idAppsGroupDefault?: true
    idOffice?: true
    email?: true
    admin?: true
    active?: true
    created?: true
    updated?: true
    expired?: true
    lastLogin?: true
    idEntitas?: true
    style?: true
    foto?: true
    session?: true
  }

  export type AdminUsersMaxAggregateInputType = {
    idUser?: true
    userName?: true
    password?: true
    fullName?: true
    idEmployee?: true
    idPosition?: true
    position?: true
    address?: true
    telpon?: true
    whatsapp?: true
    whatsappNotif?: true
    apps?: true
    idAppsGroupDefault?: true
    idOffice?: true
    email?: true
    admin?: true
    active?: true
    created?: true
    updated?: true
    expired?: true
    lastLogin?: true
    idEntitas?: true
    style?: true
    foto?: true
    session?: true
  }

  export type AdminUsersCountAggregateInputType = {
    idUser?: true
    userName?: true
    password?: true
    fullName?: true
    idEmployee?: true
    idPosition?: true
    position?: true
    address?: true
    telpon?: true
    whatsapp?: true
    whatsappNotif?: true
    apps?: true
    idAppsGroupDefault?: true
    idOffice?: true
    email?: true
    admin?: true
    active?: true
    created?: true
    updated?: true
    expired?: true
    lastLogin?: true
    idEntitas?: true
    style?: true
    foto?: true
    session?: true
    _all?: true
  }

  export type AdminUsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to aggregate.
     */
    where?: AdminUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUsersOrderByWithRelationInput | AdminUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminUsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminUsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUsersMaxAggregateInputType
  }

  export type GetAdminUsersAggregateType<T extends AdminUsersAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUsers[P]>
      : GetScalarType<T[P], AggregateAdminUsers[P]>
  }




  export type AdminUsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUsersWhereInput
    orderBy?: AdminUsersOrderByWithAggregationInput | AdminUsersOrderByWithAggregationInput[]
    by: AdminUsersScalarFieldEnum[] | AdminUsersScalarFieldEnum
    having?: AdminUsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUsersCountAggregateInputType | true
    _avg?: AdminUsersAvgAggregateInputType
    _sum?: AdminUsersSumAggregateInputType
    _min?: AdminUsersMinAggregateInputType
    _max?: AdminUsersMaxAggregateInputType
  }

  export type AdminUsersGroupByOutputType = {
    idUser: number
    userName: string
    password: string
    fullName: string
    idEmployee: string
    idPosition: string
    position: string | null
    address: string | null
    telpon: string | null
    whatsapp: string
    whatsappNotif: $Enums.YesNo
    apps: string
    idAppsGroupDefault: string
    idOffice: number
    email: string | null
    admin: $Enums.YesNo
    active: $Enums.YesNo
    created: Date | null
    updated: Date | null
    expired: Date
    lastLogin: Date | null
    idEntitas: string
    style: string
    foto: string
    session: string
    _count: AdminUsersCountAggregateOutputType | null
    _avg: AdminUsersAvgAggregateOutputType | null
    _sum: AdminUsersSumAggregateOutputType | null
    _min: AdminUsersMinAggregateOutputType | null
    _max: AdminUsersMaxAggregateOutputType | null
  }

  type GetAdminUsersGroupByPayload<T extends AdminUsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUsersGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUsersGroupByOutputType[P]>
        }
      >
    >


  export type AdminUsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idUser?: boolean
    userName?: boolean
    password?: boolean
    fullName?: boolean
    idEmployee?: boolean
    idPosition?: boolean
    position?: boolean
    address?: boolean
    telpon?: boolean
    whatsapp?: boolean
    whatsappNotif?: boolean
    apps?: boolean
    idAppsGroupDefault?: boolean
    idOffice?: boolean
    email?: boolean
    admin?: boolean
    active?: boolean
    created?: boolean
    updated?: boolean
    expired?: boolean
    lastLogin?: boolean
    idEntitas?: boolean
    style?: boolean
    foto?: boolean
    session?: boolean
  }, ExtArgs["result"]["adminUsers"]>



  export type AdminUsersSelectScalar = {
    idUser?: boolean
    userName?: boolean
    password?: boolean
    fullName?: boolean
    idEmployee?: boolean
    idPosition?: boolean
    position?: boolean
    address?: boolean
    telpon?: boolean
    whatsapp?: boolean
    whatsappNotif?: boolean
    apps?: boolean
    idAppsGroupDefault?: boolean
    idOffice?: boolean
    email?: boolean
    admin?: boolean
    active?: boolean
    created?: boolean
    updated?: boolean
    expired?: boolean
    lastLogin?: boolean
    idEntitas?: boolean
    style?: boolean
    foto?: boolean
    session?: boolean
  }

  export type AdminUsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idUser" | "userName" | "password" | "fullName" | "idEmployee" | "idPosition" | "position" | "address" | "telpon" | "whatsapp" | "whatsappNotif" | "apps" | "idAppsGroupDefault" | "idOffice" | "email" | "admin" | "active" | "created" | "updated" | "expired" | "lastLogin" | "idEntitas" | "style" | "foto" | "session", ExtArgs["result"]["adminUsers"]>

  export type $AdminUsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUsers"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      idUser: number
      userName: string
      password: string
      fullName: string
      idEmployee: string
      idPosition: string
      position: string | null
      address: string | null
      telpon: string | null
      whatsapp: string
      whatsappNotif: $Enums.YesNo
      apps: string
      idAppsGroupDefault: string
      idOffice: number
      email: string | null
      admin: $Enums.YesNo
      active: $Enums.YesNo
      created: Date | null
      updated: Date | null
      expired: Date
      lastLogin: Date | null
      idEntitas: string
      style: string
      foto: string
      session: string
    }, ExtArgs["result"]["adminUsers"]>
    composites: {}
  }

  type AdminUsersGetPayload<S extends boolean | null | undefined | AdminUsersDefaultArgs> = $Result.GetResult<Prisma.$AdminUsersPayload, S>

  type AdminUsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUsersCountAggregateInputType | true
    }

  export interface AdminUsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUsers'], meta: { name: 'AdminUsers' } }
    /**
     * Find zero or one AdminUsers that matches the filter.
     * @param {AdminUsersFindUniqueArgs} args - Arguments to find a AdminUsers
     * @example
     * // Get one AdminUsers
     * const adminUsers = await prisma.adminUsers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUsersFindUniqueArgs>(args: SelectSubset<T, AdminUsersFindUniqueArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUsers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUsersFindUniqueOrThrowArgs} args - Arguments to find a AdminUsers
     * @example
     * // Get one AdminUsers
     * const adminUsers = await prisma.adminUsers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUsersFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersFindFirstArgs} args - Arguments to find a AdminUsers
     * @example
     * // Get one AdminUsers
     * const adminUsers = await prisma.adminUsers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUsersFindFirstArgs>(args?: SelectSubset<T, AdminUsersFindFirstArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUsers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersFindFirstOrThrowArgs} args - Arguments to find a AdminUsers
     * @example
     * // Get one AdminUsers
     * const adminUsers = await prisma.adminUsers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUsersFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUsers.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUsers.findMany({ take: 10 })
     * 
     * // Only select the `idUser`
     * const adminUsersWithIdUserOnly = await prisma.adminUsers.findMany({ select: { idUser: true } })
     * 
     */
    findMany<T extends AdminUsersFindManyArgs>(args?: SelectSubset<T, AdminUsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUsers.
     * @param {AdminUsersCreateArgs} args - Arguments to create a AdminUsers.
     * @example
     * // Create one AdminUsers
     * const AdminUsers = await prisma.adminUsers.create({
     *   data: {
     *     // ... data to create a AdminUsers
     *   }
     * })
     * 
     */
    create<T extends AdminUsersCreateArgs>(args: SelectSubset<T, AdminUsersCreateArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUsersCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUsers = await prisma.adminUsers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUsersCreateManyArgs>(args?: SelectSubset<T, AdminUsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AdminUsers.
     * @param {AdminUsersDeleteArgs} args - Arguments to delete one AdminUsers.
     * @example
     * // Delete one AdminUsers
     * const AdminUsers = await prisma.adminUsers.delete({
     *   where: {
     *     // ... filter to delete one AdminUsers
     *   }
     * })
     * 
     */
    delete<T extends AdminUsersDeleteArgs>(args: SelectSubset<T, AdminUsersDeleteArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUsers.
     * @param {AdminUsersUpdateArgs} args - Arguments to update one AdminUsers.
     * @example
     * // Update one AdminUsers
     * const adminUsers = await prisma.adminUsers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUsersUpdateArgs>(args: SelectSubset<T, AdminUsersUpdateArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUsersDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUsers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUsersDeleteManyArgs>(args?: SelectSubset<T, AdminUsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUsers = await prisma.adminUsers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUsersUpdateManyArgs>(args: SelectSubset<T, AdminUsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminUsers.
     * @param {AdminUsersUpsertArgs} args - Arguments to update or create a AdminUsers.
     * @example
     * // Update or create a AdminUsers
     * const adminUsers = await prisma.adminUsers.upsert({
     *   create: {
     *     // ... data to create a AdminUsers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUsers we want to update
     *   }
     * })
     */
    upsert<T extends AdminUsersUpsertArgs>(args: SelectSubset<T, AdminUsersUpsertArgs<ExtArgs>>): Prisma__AdminUsersClient<$Result.GetResult<Prisma.$AdminUsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUsers.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUsersCountArgs>(
      args?: Subset<T, AdminUsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUsersAggregateArgs>(args: Subset<T, AdminUsersAggregateArgs>): Prisma.PrismaPromise<GetAdminUsersAggregateType<T>>

    /**
     * Group by AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUsersGroupByArgs['orderBy'] }
        : { orderBy?: AdminUsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUsers model
   */
  readonly fields: AdminUsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUsers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUsers model
   */
  interface AdminUsersFieldRefs {
    readonly idUser: FieldRef<"AdminUsers", 'Int'>
    readonly userName: FieldRef<"AdminUsers", 'String'>
    readonly password: FieldRef<"AdminUsers", 'String'>
    readonly fullName: FieldRef<"AdminUsers", 'String'>
    readonly idEmployee: FieldRef<"AdminUsers", 'String'>
    readonly idPosition: FieldRef<"AdminUsers", 'String'>
    readonly position: FieldRef<"AdminUsers", 'String'>
    readonly address: FieldRef<"AdminUsers", 'String'>
    readonly telpon: FieldRef<"AdminUsers", 'String'>
    readonly whatsapp: FieldRef<"AdminUsers", 'String'>
    readonly whatsappNotif: FieldRef<"AdminUsers", 'YesNo'>
    readonly apps: FieldRef<"AdminUsers", 'String'>
    readonly idAppsGroupDefault: FieldRef<"AdminUsers", 'String'>
    readonly idOffice: FieldRef<"AdminUsers", 'Int'>
    readonly email: FieldRef<"AdminUsers", 'String'>
    readonly admin: FieldRef<"AdminUsers", 'YesNo'>
    readonly active: FieldRef<"AdminUsers", 'YesNo'>
    readonly created: FieldRef<"AdminUsers", 'DateTime'>
    readonly updated: FieldRef<"AdminUsers", 'DateTime'>
    readonly expired: FieldRef<"AdminUsers", 'DateTime'>
    readonly lastLogin: FieldRef<"AdminUsers", 'DateTime'>
    readonly idEntitas: FieldRef<"AdminUsers", 'String'>
    readonly style: FieldRef<"AdminUsers", 'String'>
    readonly foto: FieldRef<"AdminUsers", 'String'>
    readonly session: FieldRef<"AdminUsers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AdminUsers findUnique
   */
  export type AdminUsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where: AdminUsersWhereUniqueInput
  }

  /**
   * AdminUsers findUniqueOrThrow
   */
  export type AdminUsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where: AdminUsersWhereUniqueInput
  }

  /**
   * AdminUsers findFirst
   */
  export type AdminUsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUsersOrderByWithRelationInput | AdminUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUsersScalarFieldEnum | AdminUsersScalarFieldEnum[]
  }

  /**
   * AdminUsers findFirstOrThrow
   */
  export type AdminUsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUsersOrderByWithRelationInput | AdminUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUsersScalarFieldEnum | AdminUsersScalarFieldEnum[]
  }

  /**
   * AdminUsers findMany
   */
  export type AdminUsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUsersOrderByWithRelationInput | AdminUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUsersScalarFieldEnum | AdminUsersScalarFieldEnum[]
  }

  /**
   * AdminUsers create
   */
  export type AdminUsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminUsers.
     */
    data: XOR<AdminUsersCreateInput, AdminUsersUncheckedCreateInput>
  }

  /**
   * AdminUsers createMany
   */
  export type AdminUsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUsersCreateManyInput | AdminUsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUsers update
   */
  export type AdminUsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminUsers.
     */
    data: XOR<AdminUsersUpdateInput, AdminUsersUncheckedUpdateInput>
    /**
     * Choose, which AdminUsers to update.
     */
    where: AdminUsersWhereUniqueInput
  }

  /**
   * AdminUsers updateMany
   */
  export type AdminUsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUsersUpdateManyMutationInput, AdminUsersUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUsersWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUsers upsert
   */
  export type AdminUsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminUsers to update in case it exists.
     */
    where: AdminUsersWhereUniqueInput
    /**
     * In case the AdminUsers found by the `where` argument doesn't exist, create a new AdminUsers with this data.
     */
    create: XOR<AdminUsersCreateInput, AdminUsersUncheckedCreateInput>
    /**
     * In case the AdminUsers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUsersUpdateInput, AdminUsersUncheckedUpdateInput>
  }

  /**
   * AdminUsers delete
   */
  export type AdminUsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
    /**
     * Filter which AdminUsers to delete.
     */
    where: AdminUsersWhereUniqueInput
  }

  /**
   * AdminUsers deleteMany
   */
  export type AdminUsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUsersWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUsers without action
   */
  export type AdminUsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUsers
     */
    select?: AdminUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUsers
     */
    omit?: AdminUsersOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminUsersScalarFieldEnum: {
    idUser: 'idUser',
    userName: 'userName',
    password: 'password',
    fullName: 'fullName',
    idEmployee: 'idEmployee',
    idPosition: 'idPosition',
    position: 'position',
    address: 'address',
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    whatsappNotif: 'whatsappNotif',
    apps: 'apps',
    idAppsGroupDefault: 'idAppsGroupDefault',
    idOffice: 'idOffice',
    email: 'email',
    admin: 'admin',
    active: 'active',
    created: 'created',
    updated: 'updated',
    expired: 'expired',
    lastLogin: 'lastLogin',
    idEntitas: 'idEntitas',
    style: 'style',
    foto: 'foto',
    session: 'session'
  };

  export type AdminUsersScalarFieldEnum = (typeof AdminUsersScalarFieldEnum)[keyof typeof AdminUsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AdminUsersOrderByRelevanceFieldEnum: {
    userName: 'userName',
    password: 'password',
    fullName: 'fullName',
    idEmployee: 'idEmployee',
    idPosition: 'idPosition',
    position: 'position',
    address: 'address',
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    apps: 'apps',
    idAppsGroupDefault: 'idAppsGroupDefault',
    email: 'email',
    idEntitas: 'idEntitas',
    style: 'style',
    foto: 'foto',
    session: 'session'
  };

  export type AdminUsersOrderByRelevanceFieldEnum = (typeof AdminUsersOrderByRelevanceFieldEnum)[keyof typeof AdminUsersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'YesNo'
   */
  export type EnumYesNoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'YesNo'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AdminUsersWhereInput = {
    AND?: AdminUsersWhereInput | AdminUsersWhereInput[]
    OR?: AdminUsersWhereInput[]
    NOT?: AdminUsersWhereInput | AdminUsersWhereInput[]
    idUser?: IntFilter<"AdminUsers"> | number
    userName?: StringFilter<"AdminUsers"> | string
    password?: StringFilter<"AdminUsers"> | string
    fullName?: StringFilter<"AdminUsers"> | string
    idEmployee?: StringFilter<"AdminUsers"> | string
    idPosition?: StringFilter<"AdminUsers"> | string
    position?: StringNullableFilter<"AdminUsers"> | string | null
    address?: StringNullableFilter<"AdminUsers"> | string | null
    telpon?: StringNullableFilter<"AdminUsers"> | string | null
    whatsapp?: StringFilter<"AdminUsers"> | string
    whatsappNotif?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    apps?: StringFilter<"AdminUsers"> | string
    idAppsGroupDefault?: StringFilter<"AdminUsers"> | string
    idOffice?: IntFilter<"AdminUsers"> | number
    email?: StringNullableFilter<"AdminUsers"> | string | null
    admin?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    active?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    created?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    updated?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    expired?: DateTimeFilter<"AdminUsers"> | Date | string
    lastLogin?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    idEntitas?: StringFilter<"AdminUsers"> | string
    style?: StringFilter<"AdminUsers"> | string
    foto?: StringFilter<"AdminUsers"> | string
    session?: StringFilter<"AdminUsers"> | string
  }

  export type AdminUsersOrderByWithRelationInput = {
    idUser?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    idEmployee?: SortOrder
    idPosition?: SortOrder
    position?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    telpon?: SortOrderInput | SortOrder
    whatsapp?: SortOrder
    whatsappNotif?: SortOrder
    apps?: SortOrder
    idAppsGroupDefault?: SortOrder
    idOffice?: SortOrder
    email?: SortOrderInput | SortOrder
    admin?: SortOrder
    active?: SortOrder
    created?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    expired?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    idEntitas?: SortOrder
    style?: SortOrder
    foto?: SortOrder
    session?: SortOrder
    _relevance?: AdminUsersOrderByRelevanceInput
  }

  export type AdminUsersWhereUniqueInput = Prisma.AtLeast<{
    idUser?: number
    AND?: AdminUsersWhereInput | AdminUsersWhereInput[]
    OR?: AdminUsersWhereInput[]
    NOT?: AdminUsersWhereInput | AdminUsersWhereInput[]
    userName?: StringFilter<"AdminUsers"> | string
    password?: StringFilter<"AdminUsers"> | string
    fullName?: StringFilter<"AdminUsers"> | string
    idEmployee?: StringFilter<"AdminUsers"> | string
    idPosition?: StringFilter<"AdminUsers"> | string
    position?: StringNullableFilter<"AdminUsers"> | string | null
    address?: StringNullableFilter<"AdminUsers"> | string | null
    telpon?: StringNullableFilter<"AdminUsers"> | string | null
    whatsapp?: StringFilter<"AdminUsers"> | string
    whatsappNotif?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    apps?: StringFilter<"AdminUsers"> | string
    idAppsGroupDefault?: StringFilter<"AdminUsers"> | string
    idOffice?: IntFilter<"AdminUsers"> | number
    email?: StringNullableFilter<"AdminUsers"> | string | null
    admin?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    active?: EnumYesNoFilter<"AdminUsers"> | $Enums.YesNo
    created?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    updated?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    expired?: DateTimeFilter<"AdminUsers"> | Date | string
    lastLogin?: DateTimeNullableFilter<"AdminUsers"> | Date | string | null
    idEntitas?: StringFilter<"AdminUsers"> | string
    style?: StringFilter<"AdminUsers"> | string
    foto?: StringFilter<"AdminUsers"> | string
    session?: StringFilter<"AdminUsers"> | string
  }, "idUser">

  export type AdminUsersOrderByWithAggregationInput = {
    idUser?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    idEmployee?: SortOrder
    idPosition?: SortOrder
    position?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    telpon?: SortOrderInput | SortOrder
    whatsapp?: SortOrder
    whatsappNotif?: SortOrder
    apps?: SortOrder
    idAppsGroupDefault?: SortOrder
    idOffice?: SortOrder
    email?: SortOrderInput | SortOrder
    admin?: SortOrder
    active?: SortOrder
    created?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    expired?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    idEntitas?: SortOrder
    style?: SortOrder
    foto?: SortOrder
    session?: SortOrder
    _count?: AdminUsersCountOrderByAggregateInput
    _avg?: AdminUsersAvgOrderByAggregateInput
    _max?: AdminUsersMaxOrderByAggregateInput
    _min?: AdminUsersMinOrderByAggregateInput
    _sum?: AdminUsersSumOrderByAggregateInput
  }

  export type AdminUsersScalarWhereWithAggregatesInput = {
    AND?: AdminUsersScalarWhereWithAggregatesInput | AdminUsersScalarWhereWithAggregatesInput[]
    OR?: AdminUsersScalarWhereWithAggregatesInput[]
    NOT?: AdminUsersScalarWhereWithAggregatesInput | AdminUsersScalarWhereWithAggregatesInput[]
    idUser?: IntWithAggregatesFilter<"AdminUsers"> | number
    userName?: StringWithAggregatesFilter<"AdminUsers"> | string
    password?: StringWithAggregatesFilter<"AdminUsers"> | string
    fullName?: StringWithAggregatesFilter<"AdminUsers"> | string
    idEmployee?: StringWithAggregatesFilter<"AdminUsers"> | string
    idPosition?: StringWithAggregatesFilter<"AdminUsers"> | string
    position?: StringNullableWithAggregatesFilter<"AdminUsers"> | string | null
    address?: StringNullableWithAggregatesFilter<"AdminUsers"> | string | null
    telpon?: StringNullableWithAggregatesFilter<"AdminUsers"> | string | null
    whatsapp?: StringWithAggregatesFilter<"AdminUsers"> | string
    whatsappNotif?: EnumYesNoWithAggregatesFilter<"AdminUsers"> | $Enums.YesNo
    apps?: StringWithAggregatesFilter<"AdminUsers"> | string
    idAppsGroupDefault?: StringWithAggregatesFilter<"AdminUsers"> | string
    idOffice?: IntWithAggregatesFilter<"AdminUsers"> | number
    email?: StringNullableWithAggregatesFilter<"AdminUsers"> | string | null
    admin?: EnumYesNoWithAggregatesFilter<"AdminUsers"> | $Enums.YesNo
    active?: EnumYesNoWithAggregatesFilter<"AdminUsers"> | $Enums.YesNo
    created?: DateTimeNullableWithAggregatesFilter<"AdminUsers"> | Date | string | null
    updated?: DateTimeNullableWithAggregatesFilter<"AdminUsers"> | Date | string | null
    expired?: DateTimeWithAggregatesFilter<"AdminUsers"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"AdminUsers"> | Date | string | null
    idEntitas?: StringWithAggregatesFilter<"AdminUsers"> | string
    style?: StringWithAggregatesFilter<"AdminUsers"> | string
    foto?: StringWithAggregatesFilter<"AdminUsers"> | string
    session?: StringWithAggregatesFilter<"AdminUsers"> | string
  }

  export type AdminUsersCreateInput = {
    userName: string
    password: string
    fullName: string
    idEmployee: string
    idPosition: string
    position?: string | null
    address?: string | null
    telpon?: string | null
    whatsapp: string
    whatsappNotif?: $Enums.YesNo
    apps: string
    idAppsGroupDefault: string
    idOffice: number
    email?: string | null
    admin?: $Enums.YesNo
    active?: $Enums.YesNo
    created?: Date | string | null
    updated?: Date | string | null
    expired: Date | string
    lastLogin?: Date | string | null
    idEntitas: string
    style?: string
    foto: string
    session: string
  }

  export type AdminUsersUncheckedCreateInput = {
    idUser?: number
    userName: string
    password: string
    fullName: string
    idEmployee: string
    idPosition: string
    position?: string | null
    address?: string | null
    telpon?: string | null
    whatsapp: string
    whatsappNotif?: $Enums.YesNo
    apps: string
    idAppsGroupDefault: string
    idOffice: number
    email?: string | null
    admin?: $Enums.YesNo
    active?: $Enums.YesNo
    created?: Date | string | null
    updated?: Date | string | null
    expired: Date | string
    lastLogin?: Date | string | null
    idEntitas: string
    style?: string
    foto: string
    session: string
  }

  export type AdminUsersUpdateInput = {
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    idEmployee?: StringFieldUpdateOperationsInput | string
    idPosition?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    telpon?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: StringFieldUpdateOperationsInput | string
    whatsappNotif?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    apps?: StringFieldUpdateOperationsInput | string
    idAppsGroupDefault?: StringFieldUpdateOperationsInput | string
    idOffice?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    active?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expired?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idEntitas?: StringFieldUpdateOperationsInput | string
    style?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    session?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUsersUncheckedUpdateInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    idEmployee?: StringFieldUpdateOperationsInput | string
    idPosition?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    telpon?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: StringFieldUpdateOperationsInput | string
    whatsappNotif?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    apps?: StringFieldUpdateOperationsInput | string
    idAppsGroupDefault?: StringFieldUpdateOperationsInput | string
    idOffice?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    active?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expired?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idEntitas?: StringFieldUpdateOperationsInput | string
    style?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    session?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUsersCreateManyInput = {
    idUser?: number
    userName: string
    password: string
    fullName: string
    idEmployee: string
    idPosition: string
    position?: string | null
    address?: string | null
    telpon?: string | null
    whatsapp: string
    whatsappNotif?: $Enums.YesNo
    apps: string
    idAppsGroupDefault: string
    idOffice: number
    email?: string | null
    admin?: $Enums.YesNo
    active?: $Enums.YesNo
    created?: Date | string | null
    updated?: Date | string | null
    expired: Date | string
    lastLogin?: Date | string | null
    idEntitas: string
    style?: string
    foto: string
    session: string
  }

  export type AdminUsersUpdateManyMutationInput = {
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    idEmployee?: StringFieldUpdateOperationsInput | string
    idPosition?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    telpon?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: StringFieldUpdateOperationsInput | string
    whatsappNotif?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    apps?: StringFieldUpdateOperationsInput | string
    idAppsGroupDefault?: StringFieldUpdateOperationsInput | string
    idOffice?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    active?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expired?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idEntitas?: StringFieldUpdateOperationsInput | string
    style?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    session?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUsersUncheckedUpdateManyInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    userName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    idEmployee?: StringFieldUpdateOperationsInput | string
    idPosition?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    telpon?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: StringFieldUpdateOperationsInput | string
    whatsappNotif?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    apps?: StringFieldUpdateOperationsInput | string
    idAppsGroupDefault?: StringFieldUpdateOperationsInput | string
    idOffice?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    active?: EnumYesNoFieldUpdateOperationsInput | $Enums.YesNo
    created?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expired?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idEntitas?: StringFieldUpdateOperationsInput | string
    style?: StringFieldUpdateOperationsInput | string
    foto?: StringFieldUpdateOperationsInput | string
    session?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumYesNoFilter<$PrismaModel = never> = {
    equals?: $Enums.YesNo | EnumYesNoFieldRefInput<$PrismaModel>
    in?: $Enums.YesNo[]
    notIn?: $Enums.YesNo[]
    not?: NestedEnumYesNoFilter<$PrismaModel> | $Enums.YesNo
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminUsersOrderByRelevanceInput = {
    fields: AdminUsersOrderByRelevanceFieldEnum | AdminUsersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdminUsersCountOrderByAggregateInput = {
    idUser?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    idEmployee?: SortOrder
    idPosition?: SortOrder
    position?: SortOrder
    address?: SortOrder
    telpon?: SortOrder
    whatsapp?: SortOrder
    whatsappNotif?: SortOrder
    apps?: SortOrder
    idAppsGroupDefault?: SortOrder
    idOffice?: SortOrder
    email?: SortOrder
    admin?: SortOrder
    active?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    expired?: SortOrder
    lastLogin?: SortOrder
    idEntitas?: SortOrder
    style?: SortOrder
    foto?: SortOrder
    session?: SortOrder
  }

  export type AdminUsersAvgOrderByAggregateInput = {
    idUser?: SortOrder
    idOffice?: SortOrder
  }

  export type AdminUsersMaxOrderByAggregateInput = {
    idUser?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    idEmployee?: SortOrder
    idPosition?: SortOrder
    position?: SortOrder
    address?: SortOrder
    telpon?: SortOrder
    whatsapp?: SortOrder
    whatsappNotif?: SortOrder
    apps?: SortOrder
    idAppsGroupDefault?: SortOrder
    idOffice?: SortOrder
    email?: SortOrder
    admin?: SortOrder
    active?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    expired?: SortOrder
    lastLogin?: SortOrder
    idEntitas?: SortOrder
    style?: SortOrder
    foto?: SortOrder
    session?: SortOrder
  }

  export type AdminUsersMinOrderByAggregateInput = {
    idUser?: SortOrder
    userName?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    idEmployee?: SortOrder
    idPosition?: SortOrder
    position?: SortOrder
    address?: SortOrder
    telpon?: SortOrder
    whatsapp?: SortOrder
    whatsappNotif?: SortOrder
    apps?: SortOrder
    idAppsGroupDefault?: SortOrder
    idOffice?: SortOrder
    email?: SortOrder
    admin?: SortOrder
    active?: SortOrder
    created?: SortOrder
    updated?: SortOrder
    expired?: SortOrder
    lastLogin?: SortOrder
    idEntitas?: SortOrder
    style?: SortOrder
    foto?: SortOrder
    session?: SortOrder
  }

  export type AdminUsersSumOrderByAggregateInput = {
    idUser?: SortOrder
    idOffice?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumYesNoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.YesNo | EnumYesNoFieldRefInput<$PrismaModel>
    in?: $Enums.YesNo[]
    notIn?: $Enums.YesNo[]
    not?: NestedEnumYesNoWithAggregatesFilter<$PrismaModel> | $Enums.YesNo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumYesNoFilter<$PrismaModel>
    _max?: NestedEnumYesNoFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumYesNoFieldUpdateOperationsInput = {
    set?: $Enums.YesNo
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumYesNoFilter<$PrismaModel = never> = {
    equals?: $Enums.YesNo | EnumYesNoFieldRefInput<$PrismaModel>
    in?: $Enums.YesNo[]
    notIn?: $Enums.YesNo[]
    not?: NestedEnumYesNoFilter<$PrismaModel> | $Enums.YesNo
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumYesNoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.YesNo | EnumYesNoFieldRefInput<$PrismaModel>
    in?: $Enums.YesNo[]
    notIn?: $Enums.YesNo[]
    not?: NestedEnumYesNoWithAggregatesFilter<$PrismaModel> | $Enums.YesNo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumYesNoFilter<$PrismaModel>
    _max?: NestedEnumYesNoFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}