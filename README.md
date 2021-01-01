![primitive-match logo](logo.png)

# primitive-match

> A zero-dependency pattern matching library for JavaScript with a simple API

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

#### Example

Lets say we need to perform some logic to determine the message we need show our
user. This logic depends on multiple pieces of information:

```js
const { country, tier, loggedIn } = getUserInfo()

let msg

if (loggedIn === false) {
    msg = 'Please log in to continue.'
} else if (country === 'US' || (country === 'Canada' && tier === 'premium')) {
    msg = 'Enjoy the show!'
} else if (country === 'Canada') {
    msg = 'This show is only for premium members.'
} else {
    msg = 'This show is unavailable in your country.'
}
```

In order to understand which message will appear in each different scenario, we
need to follow and understand the different conditions in each `if`
statement. The poor readability of the code makes it very error prone if we
have to add or modify a condition.

`primitive-match` makes value based pattern-matching code easier to read and
understand. We can turn the above example to this:

```js
import { match, when, _ } from 'primitive-match'

const { country, tier, loggedIn } = getUserInfo()

const msg = match(country, tier, loggedIn)(
    when([_, _, false], 'Please log in to continue.'),
    when(['US', _, true], 'Enjoy the show!'),
    when(['Canada', 'premium', true], 'Enjoy the show!'),
    when(['Canada', 'free', true], 'This show is only for premium members.'),
    when([_, _, true], 'This show is unavailable in your country.')
)
```

## API

#### `match(...values: any[])`

Accepts any number of JavaScript primitives of any type. Returns a function that
accepts any number of `when` functions.

#### `when(pattern: any[], result: any)`

Accepts an array of the same length as the values provided to the parent `match`
function and a result which will be returned in case of a match. It performs
the pattern matching using reference type and value equality. There will be no
match if the number of values given to its pattern array is not the same as the
number of values given to its parent `match` function, or if none of the values
match their corresponding pattern.

#### `_`

A string with the value of `__primitive__match__wildcard__value__` that serves
as the wild card matching operator.

If `_` conflicts with another library import such as `lodash` or `underscore`,
then you can alias it when importing it:

```js
import { match, when, _ as anything } from 'primitive-match'

// prettier-ignore
const result = match(someValue, anotherValue)(
    when(['value', anything], 'result')
)
```
