import {photos} from './data.js';
import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;

const generateOnePhoto = (picture) => {
  const onePhoto =  pictureTemplate.cloneNode(true);
  onePhoto.querySelector('.picture__img').src = picture.url;
  onePhoto.querySelector('.picture__comments').textContent = picture.comments.length;
  onePhoto.querySelector('.picture__likes').textContent = picture.likes;
  return onePhoto;

  userElement.addEventListener('click', () => {
    openBigPicture(url, likes, comments);
  });
}

const fragment = document.createDocumentFragment();

for (let i = 0; i < photos.length; i++) {
  let ph = generateOnePhoto(photos[i]);
  fragment.appendChild(ph);
}

const pictures = document.querySelector('.pictures'); pictures.appendChild(fragment);

export {generateOnePhoto};
