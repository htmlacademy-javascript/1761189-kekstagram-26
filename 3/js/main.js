const getRandomNumber = (min, max) => {
  if (min >= max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const maxSymbols = (str, maxLength) => {
  return str.length <= maxLength;
}
