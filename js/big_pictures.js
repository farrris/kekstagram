let commentsDisplay = 0;

const commentsLoader = document.querySelector('.comments-loader');

let bigPictureComments = [];

const renderComments = () => {
  const commentCount = document.querySelector('.social__comment-count');
  const commentsBlock = document.querySelector('.social__comments');

  commentsDisplay += 5;

  if (commentsDisplay >= bigPictureComments.length) {
    commentsLoader.classList.add('hidden');
    commentsDisplay = bigPictureComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsDisplay; i++) {;
    const commentElement = createComment(bigPictureComments[i]);
    fragment.append(commentElement);
  }

  commentsBlock.innerHTML = '';
  commentsBlock.append(fragment);
  commentCount.innerHTML = `${commentsDisplay} из <span class="comments-count">${bigPictureComments.length}</span> комментариев`;
};

function renderBigPicture(picture) {
  document.body.classList.add('modal-open');
  let bigPictureBlock = document.querySelector('.big-picture');
  bigPictureBlock.classList.remove('hidden');
  bigPictureBlock = setBigPictureDetails(bigPictureBlock, picture);
  bigPictureBlock = setBigPictureComments(bigPictureBlock, picture.comments);
  bigPictureBlock = setEventClose(bigPictureBlock);

  bigPictureComments = picture.comments;
  renderComments(); 
}

function setEventClose(bigPictureBlock) {
  const cancelButton = bigPictureBlock.querySelector('.big-picture__cancel');
  document.addEventListener('keydown', closeOnEsc);
  cancelButton.addEventListener('click', closeBigPicture);
}

function closeOnEsc(e) {
  if (e.key === 'Escape') {
    closeBigPicture();
  }
}

function closeBigPicture() {
  const bigPictureBlock = document.querySelector('.big-picture');
  bigPictureBlock.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnEsc);
  commentsDisplay = 0;
}

function setBigPictureDetails(pictureBlock, picture) {
  const imgBlock = pictureBlock.querySelector('.big-picture__img');
  imgBlock.firstElementChild.src = picture.url;

  const likesBlock = pictureBlock.querySelector('.comments-count');
  likesBlock.textContent = picture.comments.length;

  const commentsBlock = pictureBlock.querySelector('.likes-count');
  commentsBlock.textContent = picture.likes;

  const descriptionBlock = pictureBlock.querySelector('.social__caption');
  descriptionBlock.textContent = picture.description;

  return pictureBlock;
}

function setBigPictureComments(pictureBlock, comments) {
  const commentsBlock = document.querySelector('.social__comments');
  comments.forEach((comment) => {
    const commentBlock = createComment(comment);
    commentsBlock.append(commentBlock);
  });

  return pictureBlock;

}

function createComment(commentData) {
  const commentBlock = document.createElement('li');
  commentBlock.classList.add('social__comment');

  const commentImg = createImg(commentData.avatar, commentData.name);
  const commentText = createCommentText(commentData.message);

  commentBlock.append(commentImg);
  commentBlock.append(commentText);

  return commentBlock;
}

function createImg(url, name) {
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = url;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  return img;
}

function createCommentText(message) {
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  return p;
}

commentsLoader.addEventListener("click", renderComments)

export {renderBigPicture};
