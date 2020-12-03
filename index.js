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
    if (pattern[i] !== args[i]) return { matches: false };
  }

  return { matches: true, result };
};

let a = "a",
  b = "b",
  c = "c";

const positive = match(a, b, c)(when(["a", "b", "c"], "something"));
const negative = match(a, b, c)(when(["d", "e", "f"], "something"));
const lengthMismatch = match(a, b, c)(when(["a", "b"], "something"));
console.log("Positive: ", positive);
console.log("Negative: ", negative);
console.log("Length Mismatch: ", lengthMismatch);
