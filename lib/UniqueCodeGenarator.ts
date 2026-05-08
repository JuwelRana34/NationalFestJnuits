export const generateUniqueCode = (tag: string) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomNum = (array[0] % 900000) + 100000; // 6 digit unique number
  return `${tag}-${randomNum}`;
};
