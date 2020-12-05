const WILDCARD_VALUE = '__matchmaker__wildcard__value__'

type PositiveMatch = {
    matches: true
    result: any
}

type NegativeMatch = {
    matches: false
}

type MatchResult = PositiveMatch | NegativeMatch

export const match = (...values: any[]) => (...whens: Function[]) =>
    whens
        .map((when) => when(values))
        .find(({ matches, result }) => matches && result)?.result

export const when = (pattern: any[], result: any): Function => (
    values: any[]
): MatchResult => {
    if (pattern.length != values.length) return { matches: false }

    for (let i = 0; i < pattern.length; ++i) {
        if (pattern[i] === WILDCARD_VALUE) continue
        if (pattern[i] !== values[i]) return { matches: false }
    }

    return { matches: true, result }
}

export const _ = WILDCARD_VALUE

const color = (r: number, g: number, b: number, a: number) =>
    match(r, g, b, a)(
        when([_, _, _, 0], 'Transparent'),
        when([255, 13, 255, _], 'Magenta'),
        when([255, 83, 13, _], 'Orange'),
        when([49, 193, 175, _], 'Turquoise')
    )

console.log('Transparent:', color(255, 13, 255, 0))
console.log('Magenta:', color(255, 13, 255, 100))
console.log('Orange:', color(255, 83, 13, 100))
console.log('Turquoise:', color(49, 193, 175, 100))
