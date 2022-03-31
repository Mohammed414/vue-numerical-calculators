const find_firsts = (f) => {
  const find_delta_f = (f) => {
    delta_f = [];
    for (let i = 0; i < f.length - 1; i++) {
      delta_f.push(f[i + 1] - f[i]);
    }
    return delta_f;
  };
  let firsts = [f[0]];
  while (f.length != 1) {
    f = find_delta_f(f);
    firsts.push(f[0]);
  }
  return firsts;
};
