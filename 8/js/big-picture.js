import {escEvent} from './util.js';

const SHOW_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

const closeBigPicturePhoto = document.querySelector('.big-picture__cancel');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img img');
const bigPictureLike = bigPicture.querySelector('.likes-count');
let realComments = [];

const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const pictureCommentsDescription = bigPicture.querySelector('.social__caption');
const pictureCommentCount = bigPicture.querySelector('.social__comment-count');
const pictureCommentLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCommentItem = bigPicture.querySelector('.social__comment');

const showCommentsAll = commentsInfo => {
  const commentFragment = document.createDocumentFragment();
  commentsInfo.forEach(({ avatar, name, message }) => {
    const comment = bigPictureCommentItem.cloneNode(true);
    comment.querySelector('.social__picture').src = 'img/' + avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentFragment.append(comment);
  });
  return commentFragment;
}

const showOneComments = (comments) => {
  const visibleComments = comments.slice(0, SHOW_COMMENTS);
  const firstComments = showCommentsAll(visibleComments);

  pictureCommentCount.textContent = `${visibleComments.length} из ${comments.length} комментариев`;
  bigPictureCommentsList.appendChild(firstComments);

  if (visibleComments.length === comments.length) {
    pictureCommentLoader.classList.add('hidden');
  }
}

const commentClickHandler = () => {
  const addingComments = realComments.slice(bigPictureCommentsList.children.length, bigPictureCommentsList.children.length + SHOW_COMMENTS);
  const showMoreComments = showCommentsAll(addingComments);
  bigPictureCommentsList.appendChild(showMoreComments);

  if (realComments.length === bigPictureCommentsList.children.length) {
    pictureCommentLoader.classList.add('hidden');
  }

  pictureCommentCount.firstChild.textContent = `${bigPictureCommentsList.children.length} из ${realComments.length} комментариев`;
}

const modalCloseClickHandler = () => {
  bigPicture.classList.add('hidden');
  pictureCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  closeBigPicturePhoto.removeEventListener('click', modalCloseClickHandler);
  document.removeEventListener('keydown', closeEscHandler);
}

const closeEscHandler = (evt) => {
  if (escEvent(evt)) {
    modalCloseClickHandler();
  }
}

const bigPictureModalOpen = ()=> {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeBigPicturePhoto.addEventListener('click', modalCloseClickHandler);
  document.addEventListener('keydown', closeEscHandler);
}

const openBigPicture = (url, likes, comments, description) => {
  bigPictureModalOpen();
  bigPicturePhoto.src = url;
  bigPictureLike.textContent = likes;
  bigPictureComments.textContent = comments.length;
  pictureCommentsDescription.textContent = description;

  bigPictureCommentsList.innerHTML = '';
  realComments = comments.slice();

  const bigPictureModalUp = () => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    closeBigPicturePhoto.addEventListener('click', modalCloseClickHandler);
    pictureCommentLoader.addEventListener('click', commentClickHandler);
    showOneComments(comments);
  }

  bigPictureModalUp();

  showOneComments(comments);
}

export {openBigPicture};
