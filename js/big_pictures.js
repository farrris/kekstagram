function renderBigPicture(picture) {
    document.body.classList.add("modal-open");
    let bigPictureBlock = document.querySelector(".big-picture");
    bigPictureBlock.classList.remove("hidden");
    bigPictureBlock = setBigPictureDetails(bigPictureBlock, picture);
    bigPictureBlock = setBigPictureComments(bigPictureBlock, picture.comments);
    bigPictureBlock = setEventClose(bigPictureBlock);
}

function setEventClose(bigPictureBlock) {
    const cancelButton = bigPictureBlock.querySelector(".big-picture__cancel");
    document.addEventListener("keydown", closeOnEsc);
    cancelButton.addEventListener("click", closeBigPicture)
}

function closeOnEsc(e) {
    if (e.key == "Escape") {
        closeBigPicture();
    }
}

function closeBigPicture() {
    let bigPictureBlock = document.querySelector(".big-picture");
    bigPictureBlock.classList.add("hidden");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", closeOnEsc);
}

function setBigPictureDetails(pictureBlock, picture) {
    let imgBlock = pictureBlock.querySelector(".big-picture__img");
    imgBlock.firstElementChild.src = picture.url; 

    let likesBlock = pictureBlock.querySelector(".comments-count");
    likesBlock.textContent = picture.comments.length;

    let commentsBlock = pictureBlock.querySelector(".likes-count");
    commentsBlock.textContent = picture.likes; 

    let descriptionBlock = pictureBlock.querySelector(".social__caption");
    descriptionBlock.textContent = picture.description;

    return pictureBlock;
}

function setBigPictureComments(pictureBlock, comments) {
    let commentsBlock = document.querySelector('.social__comments');
    comments.forEach(comment => {
        let commentBlock = createComment(comment);
        commentsBlock.append(commentBlock);
    });
    
    console.log(commentsBlock);

    return pictureBlock;

}

function createComment(commentData) {
    let commentBlock = document.createElement('li');
    commentBlock.classList.add("social__comment");
    
    let commentImg = createImg(commentData.avatar, commentData.name);
    let commentText = createCommentText(commentData.message);

    commentBlock.append(commentImg);
    commentBlock.append(commentText);

    return commentBlock;
}

function createImg(url, name) {
    let img = document.createElement("img");
    img.classList.add("social__picture");
    img.src = url;
    img.alt = name;
    img.width = 35;
    img.height = 35;

    return img;
}

function createCommentText(message) {
    let p = document.createElement("p");
    p.classList.add("social__text");
    p.textContent = message;
    
    return p;
}

export {renderBigPicture};