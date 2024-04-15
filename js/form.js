const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadSubmit = document.querySelector("#upload-submit")
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentsInput = document.querySelector('.text__description');
const serverErrorMessage = document.querySelector("#error");
const serverErrorButton = document.querySelector(".error__button");
const serverSuccessMessage = document.querySelector("#success");
const serverSuccessButton = document.querySelector(".success__button")

import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

import { createImage } from "./api.js"

const hideSuccessMessage = () => {
  serverSuccessMessage.hidden = true;
}

const hideErrorMessage = () => {
  serverErrorMessage.hidden = true;
}

const pristine = new Pristine(form, {
    classTo: 'img-upload__element',
    errorTextParent: 'img-upload__element',
    errorTextClass: 'img-upload__error',
  });

const validateHashtags = (hashtagsInput) => {
    const checkValidSymbolsRegex = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
    const hashtags = hashtagsInput.split(' ').map((tag) => tag.toLowerCase().trim()).filter(Boolean);

    if (hashtags.length > 5) return false;
    if (hashtags.length != new Set(hashtags).size) return false;
    for (let i = 0; i < hashtags.length; i++) {
        if (hashtags[i][0] != "#") return false;
        if (checkValidSymbolsRegex.test(hashtags[i].slice(1))) return false;
        if (hashtags[i].length <= 1) return false;
        if (hashtags[i].length > 20) return false;
    };

    return true;
}

const checkHashtagOrCommentFocused = () => {
  return document.activeElement == hashtagsInput || document.activeElement == commentsInput;
}

const uploadFileEvent = () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', EscKeyDown);
  };

const hideModal = () => {
    imgUploadForm.reset();
    resetScale();
    resetEffects();
    pristine.reset();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', EscKeyDown);
}

function EscKeyDown(evt) {
    if (evt.key === 'Escape' && !checkHashtagOrCommentFocused()) {
      evt.preventDefault();
      hideModal();
    }
}

const uploadCancelClick = () => {
    hideModal();
};

pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    'Неправильно заполнены хэштеги'
);

const formSubmit = async (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    const data = new FormData(form)
    uploadSubmit.disabled = true;
    await createImage(data);
    uploadSubmit.disabled = false;
    hideModal();
  };

};

uploadFile.addEventListener('change', uploadFileEvent);
uploadCancel.addEventListener('click', uploadCancelClick);
form.addEventListener('submit', formSubmit);
serverErrorButton.addEventListener('click', hideErrorMessage);
serverSuccessButton.addEventListener('click', hideSuccessMessage);