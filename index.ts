const WILDCARD_VALUE = '__matchmaker__wildcard__value__'

type PositiveMatch = {
    matches: true
    result: any
}

type NegativeMatch = {
    matches: false
}

type MatchResult = PositiveMatch | NegativeMatch

const match = (...values: any[]) => (...whens: Function[]) =>
    whens
        .map((when) => when(values))
        .find(({ matches, result }) => matches && result)?.result

const when = (pattern: any[], result: any): Function => (
    values: any[]
): MatchResult => {
    if (pattern.length != values.length) return { matches: false }

    for (let i = 0; i < pattern.length; ++i) {
        if (pattern[i] === WILDCARD_VALUE) continue
        if (pattern[i] !== values[i]) return { matches: false }
    }

    return { matches: true, result }
}

const _ = WILDCARD_VALUE

export { match, when, _ }
