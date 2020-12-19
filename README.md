![primitive-match logo](logo.png)

# primitive-match

> A 1 KB pattern matching library for JavaScript with a simple API

## Install

```
$ npm install primitive-match
```

## Usage

```js
import { match, when, _ } from 'primitive-match'

const color = match(r, g, b, a)(
    when([_, _, _, 0], 'Transparent'),
    when([255, 13, 255, _], 'Magenta'),
    when([255, 83, 13, _], 'Orange'),
    when([49, 193, 175, _], 'Turquoise')
)
```

## API

#### `match(...values: any[])`

Accepts any number of JavaScript primitives of any type. Returns a function that accepts any number of `when` functions.

#### `when(any[], string)`

Accepts an array of the same length as the values provided to the parent `match` function and a result which will be returned as the in case of a match. It
performs the pattern matching using reference type and value equality. There will be no match if the number of values given in the array it accepts as the first argument is not the same as the number of values given to its parent
`match` function, or if none of the values not match their corresponding pattern.

#### `_`

A string with the value of `__primitive__match__wildcard__value__` that serves as the wild card matching operator.

If `_` conflicts with another library import such as `lodash` or `underscore`, then you can alias it when importing it:

```js
import { match, when, _ as wildCardMatcher } from 'primitive-match'

match(someValue, anotherValue)(when(['value', wildCardMatcher], 'result'))
```
