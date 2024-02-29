import {renderBigPicture} from "./big_pictures.js";

function renderPictures(pictures) {
    let picturesBlock = document.querySelector(".pictures")

    const fragment = new DocumentFragment()

    pictures.forEach(element => {
        let pictureBlock = picture.content.cloneNode(true);
        pictureBlock = setPictureUrl(pictureBlock, element);
        pictureBlock = setPictureComments(pictureBlock, element);
        pictureBlock = setPictureLikes(pictureBlock, element);
        pictureBlock = clickHandler(pictureBlock, element);
        fragment.append(pictureBlock);
    });

    picturesBlock.append(fragment);
}

function setPictureUrl(pictureBlock, picture) {
    let img = pictureBlock.querySelector(".picture__img");
    img.src = picture.url; 

    return pictureBlock;
} 

function setPictureComments(pictureBlock, picture) {
    let commentsBlock = pictureBlock.querySelector(".picture__comments");
    commentsBlock.textContent = picture.comments.length; 
    
    return pictureBlock;
}

function setPictureLikes(pictureBlock, picture) {
    let likesBlock = pictureBlock.querySelector(".picture__likes");
    likesBlock.textContent = picture.likes; 

    return pictureBlock;
}

function clickHandler(pictureBlock, picture) {
    let a = pictureBlock.querySelector(".picture");
    a.addEventListener("click", renderBigPicture.bind(null, picture));

    return pictureBlock;
}

export {renderPictures};