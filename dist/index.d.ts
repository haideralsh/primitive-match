declare type Operator = 'either' | 'neither';
declare type Operation = {
    operator: Operator;
    elements: ReadonlyArray<any>;
};
declare const either: (...elements: ReadonlyArray<any>) => Operation;
declare const neither: (...elements: ReadonlyArray<any>) => Operation;
/**
 * `match` is a higher order function that takes any number of values of any type
 * and returns a function that accepts any number of functions that have a
 * return type of {@link MatchResult}
 */
declare const match: (...values: ReadonlyArray<any>) => (...whens: Function[]) => any;
/**
 * `when` is a higher order function that receives an array of the same length as
 * the values provided to the parent {@link match} function, and a result which
 * will be returned as the `result` in {@link PositiveMatch} in case of a
 * positive match.
 *
 * `when` performs the pattern matching using reference type and value equality. It
 * returns a negative match if the number of values given to its parent
 * {@link match} function is not the same as the number of patterns it is given,
 * or if any of the values do not match their corresponding pattern value.
 */
declare const when: (pattern: ReadonlyArray<any>, result: any) => Function;
/**
 * The exported alias to {@link WILDCARD_VALUE}. It serves as the wild card
 * matching operator.
 */
declare const _ = "__primitive__match__wildcard__value__";
export { match, when, neither, either, _ };
