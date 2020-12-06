import { match, when, _ } from '.'

const color = (r: number, g: number, b: number, a: number) =>
    match(r, g, b, a)(
        when([_, _, _, 0], 'Transparent'),
        when([255, 13, 255, _], 'Magenta'),
        when([255, 83, 13, _], 'Orange'),
        when([49, 193, 175, _], 'Turquoise')
    )

describe('color function', () => {
    test('Returns the right color when given the right numbers', () => {
        expect(color(255, 13, 255, 0)).toBe('Transparent')
        expect(color(255, 13, 255, 100)).toBe('Magenta')
        expect(color(255, 83, 13, 100)).toBe('Orange')
        expect(color(49, 193, 175, 100)).toBe('Turquoise')
    })
})
