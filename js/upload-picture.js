import {escEvent} from './util.js';
import {getValidation} from './validate.js';
import {sendData} from './upload-fetch.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const effectsPreview = document.querySelectorAll('.effects__preview')
const uploadCancelBtn = document.querySelector('#upload-cancel');
const descriptionText = document.querySelector('.text__description');
const hashtagsText = document.querySelector('.text__hashtags');

const uploadScale = document.querySelector('.img-upload__scale');
const smallerBtn = uploadScale.querySelector('.scale__control--smaller');
const biggerBtn = uploadScale.querySelector('.scale__control--bigger');
const scaleControl = uploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const uploadFile = () => {

  const escPressed = (evt) => {
    if (escEvent(evt)) {
      closeUploadOverlay();
    }
  };

  const exceptEscPressed = (element) => {
    element.onfocus = () => {
      document.removeEventListener('keydown', escPressed);
    }
    element.onblur = () => {
      document.addEventListener('keydown', escPressed);
    }
  };

  exceptEscPressed(hashtagsText);
  exceptEscPressed(descriptionText);

  const openUploadOverlay = () => {
    rescale();
    getValidation();
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', escPressed);
  };

  const closeUploadOverlay = () => {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escPressed);
    resetOptions();
  };

  const uploadNewFile = () => {
    uploadInput.addEventListener('change', () => {
      const file = uploadInput.files[0];
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          preview.src = reader.result;
          effectsPreview.forEach(item => {
            item.style.backgroundImage = `url('${reader.result}')`;
          })
        });
        reader.readAsDataURL(file);
        openUploadOverlay();
      } else {
        resetOptions();
      }
    });
  };
  uploadNewFile();

  uploadCancelBtn.addEventListener('click', () => {
    closeUploadOverlay();
  });

  const resetOptions = () => {
    document.querySelector('.img-upload__preview img').style.transform = 1;
    document.querySelector('.img-upload__preview img').className = '';
    document.querySelector('.img-upload__preview img').style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    document.querySelector('.effects__radio:first-child').checked = 'true';
    uploadInput.value = null;
    descriptionText.value = null;
    hashtagsText.value = null;
  };

  const setUserFormSubmit = () => {
    const uploadForm = document.querySelector('#upload-select-image');

    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      sendData(
        () => {
          closeUploadOverlay();
          resetOptions();
        },
        () => {
          closeUploadOverlay();
          resetOptions();
        },
        new FormData(evt.target),
      );
    });
  };

  setUserFormSubmit();
};

const rescale = () => {
  scaleControl.value = '100%';
  let scaleControlValue = parseInt(scaleControl.value) / 100;

  const transformPhoto = (scaleControlValue) => {
    imgUploadPreview.querySelector('img').style.transform = `scale(${scaleControlValue})`;
  };
  transformPhoto(scaleControlValue);

  smallerBtn.addEventListener('click', () => {
    if (scaleControlValue > 0.25) {
      scaleControlValue -= 0.25;
    }
    scaleControl.value = scaleControlValue * 100 + '%';
    transformPhoto(scaleControlValue);
  });

  biggerBtn.addEventListener('click', () => {
    if (scaleControlValue < 1) {
      scaleControlValue += 0.25;
    }
    scaleControl.value = scaleControlValue * 100 + '%';
    transformPhoto(scaleControlValue);
  });
};

export {uploadFile};
