export const random = (min, max) => {
  if (max === undefined) {
    return Math.random() * min;
  }

  return Math.random() * (max - min) + min;
};

export const randomGaussian = (min, max) => {
  const iter = 5;
  let sum = 0;

  for (let i = 0; i < iter; i += 1) {
    sum += Math.random() * (max - min) + min;
  }

  return sum / iter;
};
