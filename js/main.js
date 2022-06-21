//Возвращение случаного числа
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= max) {
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция проверки длины коммента

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
