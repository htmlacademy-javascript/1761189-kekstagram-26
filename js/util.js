const getRandomNumber = (min, max) => {
  if (min >= max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomItem = (array) => {
    let randomIndex =getRandomNumber(0, array.length);
    return array[randomIndex];
}

const maxSymbols = (str, maxLength) => {
  return str.length <= maxLength;
}

export {getRandomNumber, getRandomItem};
