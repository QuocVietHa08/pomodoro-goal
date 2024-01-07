export const delay = value => {
  return new Promise(resolve => {
    const t = setTimeout(() => {
      clearTimeout(t);
      resolve();
    }, value);
  });
};
