const getValidation = () => {

  const MAX_DESCR_LENGTH = 140;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_QUANTITY = 5;

  const hashtagInputText = document.querySelector('.text__hashtags');
  const descriptionText = document.querySelector('.text__description');
  const uploadSubmitBtn = document.querySelector('.img-upload__submit');


  const answerBadValue = (field) => {
    field.style.border = '5px dotted #e90001';
    uploadSubmitBtn.disabled = true;
  };

  const answerGoodValue = (field) => {
    field.style.border = 'none';
    field.setCustomValidity('');
    uploadSubmitBtn.disabled = false;
  }

  const getValidateOnDescrField = (field) => {
    field.addEventListener('input', () => {
      const valueLength = field.value.length;
      if (valueLength > MAX_DESCR_LENGTH) {
        field.setCustomValidity('Максимальная длина описания превышена на ' + (valueLength - MAX_DESCR_LENGTH) + ' символов.')
        answerBadValue(field);
      } else {
        answerGoodValue(field);
      }
      field.reportValidity();
    });
  };
  getValidateOnDescrField(descriptionText);

  const getValidationOnHashtagField = (field) => {
    field.addEventListener('input', () => {
      //берется строка, введенная пользователем  field.value, затем она переводится в нижний регистр toLowerCase().
      //затем она разбивается на  подстроки, в соответствии с правилом \s+, это регулярное выражение - для поиска подстрок в строке
      const inputValues = field.value.toLowerCase().trim().split(/\s+/);

      if (inputValues.some((item) => item[0] !== '#')) {
        field.setCustomValidity('Напишите хэштэг используя #.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item.match(/[^A-Za-zА-Яа-я0-9#]/))) {
        field.setCustomValidity('Не используйте спецсимволы.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item === '#')) {
        field.setCustomValidity('Введите имя хэштэга.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item.length > MAX_HASHTAG_LENGTH)) {
        field.setCustomValidity(`Максимальная длина хэштэга - ${MAX_HASHTAG_LENGTH} символов.`);
        answerBadValue(field);
      } else if (inputValues.some((item => item.indexOf('#', 1) > 0))) {
        field.setCustomValidity('Хэштэги нужно писать через пробел.');
        answerBadValue(field);
      } else if (inputValues.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1)) {
        field.setCustomValidity('Хэш-теги не должны повторяться.');
        answerBadValue(field);
      } else  if (inputValues.length > MAX_HASHTAG_QUANTITY) {
        field.setCustomValidity(`Максимальное число хэштэгов - ${MAX_HASHTAG_QUANTITY}.`);
        answerBadValue(field);
      } else {
        field.setCustomValidity('');
        answerGoodValue(field);
      }
      field.reportValidity();
    });
  };
  getValidationOnHashtagField(hashtagInputText);
};

export {getValidation};
