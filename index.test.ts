import { match, when, _ } from '.'

describe('match function', () => {
    test('calls all argument functions and passes them its values as an array', () => {
        const a = 'a',
            b = 'b',
            c = 'c'

        const funcA = (arr: any[]) => {
            expect(arr).toEqual([a, b, c])
            return { matches: false }
        }

        const funcB = (arr: any[]) => {
            expect(arr).toEqual([a, b, c])
            return { matches: false }
        }

        match(a, b, c)(funcA, funcB)
    })

    test('returns result when there is a match', () => {
        const a = 'a',
            b = 'b',
            c = 'c'

        const func = (_: any[]) => {
            return { matches: true, result: 'result' }
        }

        expect(match(a, b, c)(func)).toBe('result')
    })

    test('returns `undefined` when there is no match', () => {
        const a = 'a',
            b = 'b',
            c = 'c'

        const func = (_: any[]) => {
            return { matches: false }
        }

        expect(match(a, b, c)(func)).toBe(undefined)
    })
})

describe('when function', () => {
    // Behaviour
    test("returns a { matches: false } when the pattern's array's length is not the same as the values' array's length", () => {
        expect(when([1, 2, 3, 4], 'result')([])).toEqual({ matches: false })
    })

    test('returns a { matches: false } when any value does not match', () => {
        expect(when([1, 2, 3, 4], 'result')([1, 2, 4, 3])).toEqual({
            matches: false,
        })
    })

    test("returns a { match: true, result: RESULT } if all pattern's values match", () => {
        expect(when([1, 2, 3, 4], 'result')([1, 2, 3, 4])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('does not consider wildcard matcher', () => {
        expect(when([_], 'result')(['a'])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    // Support for primitives
    test('supports number matching', () => {
        expect(when([1, 2, 3], 'result')([1, 2, 3])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('supports string matching', () => {
        expect(
            when(['foo', 'bar', 'baz'], 'result')(['foo', 'bar', 'baz'])
        ).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('supports BigInt matching', () => {
        expect(
            when(
                [BigInt(9007199254740991)],
                'result'
            )([BigInt(9007199254740991)])
        ).toEqual({
            matches: true,
            result: 'result',
        })
    })

    // Untruthy values
    test('supports null matching', () => {
        expect(when([null], 'result')([null])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('supports undefined matching', () => {
        expect(when([undefined], 'result')([undefined])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('supports empty string matching', () => {
        expect(when([''], 'result')([''])).toEqual({
            matches: true,
            result: 'result',
        })
    })

    test('supports number 0 matching', () => {
        expect(when([0], 'result')([0])).toEqual({
            matches: true,
            result: 'result',
        })
    })
})

describe('wildcard matcher `_`', () => {
    test('is a wildcard matcher', () => {
        expect(match('result')(when([_], 'result'))).toBe('result')
    })
})
