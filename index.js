const WILDCARD_VALUE =
  "__matchmaker__wildcard__caf2b6d7-0f49-4575-bccb-bc8ccca57ae8";

const match = (...args) => {
  return (...whens) => {
    const res = whens
      .map((when) => when(args))
      .find(({ matches, result }) => matches && result);

    return res && res.result;
  };
};

const when = (pattern, result) => (args) => {
  if (pattern.length != args.length) return { matches: false };

  for (let i = 0; i < pattern.length; ++i) {
    if (pattern[i] === WILDCARD_VALUE) continue;
    if (pattern[i] !== args[i]) return { matches: false };
  }

  return { matches: true, result };
};

const _ = WILDCARD_VALUE;

const color = (r, g, b, a) =>
  match(r, g, b, a)(
    when([_, _, _, 0], "Transparent"),
    when([255, 13, 255, _], "Magenta"),
    when([255, 83, 13, _], "Orange"),
    when([49, 193, 175, _], "Turquoise")
  );

console.log("Transparent:", color(255, 13, 255, 0));
console.log("Magenta:", color(255, 13, 255, 100));
console.log("Orange:", color(255, 83, 13, 100));
console.log("Turquoise:", color(49, 193, 175, 100));
