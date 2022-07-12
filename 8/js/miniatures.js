import {photos} from './data.js';
import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generateOnePhoto = (picture) => {
  const onePhoto =  pictureTemplate.cloneNode(true);
  onePhoto.querySelector('.picture__img').src = picture.url;
  onePhoto.querySelector('.picture__comments').textContent = picture.comments.length;
  onePhoto.querySelector('.picture__likes').textContent = picture.likes;
  onePhoto.addEventListener('click', () => {
    openBigPicture(picture.url, picture.likes, picture.comments, picture.description);
  });
  onePhoto.addEventListener('keydown',
  (evt) => {
    if (evt.key === 'Enter') {
      openBigPicture(picture.url, picture.likes, picture.comments, picture.description);
    }
  });
  return onePhoto;
}

const fragment = document.createDocumentFragment();

for (let i = 0; i < photos.length; i++) {
  let ph = generateOnePhoto(photos[i]);
  fragment.appendChild(ph);
}

const pictures = document.querySelector('.pictures'); pictures.appendChild(fragment);

export {generateOnePhoto};
