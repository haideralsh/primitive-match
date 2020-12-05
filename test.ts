import { match, when, _ } from '.'

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
