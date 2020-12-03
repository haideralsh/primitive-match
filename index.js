const match = (...args) => {
  return (...whens) => {
    const res = whens
      .map((when) => when(args))
      .find(({ matches, result }) => {
        if (matches) return result;
      });

    return res && res.result;
  };
};

const when = (pattern, result) => (args) => {
  if (pattern.length != args.length) {
    throw new Error(
      "Number of arguments in the when array should match the number of arguments in the match"
    );
  }

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
console.log("Positive: ", positive);
console.log("Negative: ", negative);
