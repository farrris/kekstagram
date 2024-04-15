import { renderPictures } from './pictures.js';

const serverErrorMessage = document.querySelector("#error");
const serverErrorGetMessage = document.querySelector("#error-get")
const serverSuccessMessage = document.querySelector("#success");

async function getImages() {
    try {
        const url = "https://28.javascript.htmlacademy.pro/kekstagram/data";

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Ошибка сервера!");
        }

        serverErrorGetMessage.hidden = true;
        
        const data = await res.json();

        renderPictures(data);

    } catch (error) {
        serverErrorGetMessage.hidden = false;
    }
}

async function createImage(data) {
    try {
        const url = 'https://28.javascript.htmlacademy.pro/kekstagram';

        const res = await fetch(url, {
            method: "POST",
            body: data
        })

        if (!res.ok) {
            throw new Error("Ошибка сервера!");
        }

        serverErrorMessage.hidden = true;
        serverSuccessMessage.hidden = false;


    } catch (error) {
        serverSuccessMessage.hidden = true;
        serverErrorMessage.hidden = false;
    }
}

export {getImages, createImage};