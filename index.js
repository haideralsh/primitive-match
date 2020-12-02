const match = (...args) => {
  return (...whens) => {
    whens.map((when) => console.log(when(args)));
  };
};

const when = (pattern, result) => (args) => {
  if (pattern.length != args.length) {
    throw new Error(
      "Number of arguments in the when array should match the number of arguments in the match"
    );
  }

  return pattern.map((criteria, i) =>
    criteria === args[i] ? { fits: true, value: result } : { fits: false }
  );
};

let a = "a",
  b = "b",
  c = "c";

match(a, b, c)(when(["a", "b", "c"], "something"));
