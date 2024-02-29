import {getRandomPositiveInteger} from "./utils.js"

function getRandomMessage()
{
    let messages = [
        "Всё отлично!",
        "В целом всё неплохо. Но не всё.",
        "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
        "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
        "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
        "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
    ];

    let index = getRandomPositiveInteger(0, messages.length-1)

    return messages[index];
}

function getRandomName()
{
    let names = [
        "Игорь",
        "Андрей",
        "Никита",
        "Павел",
        "Константин",
        "Владимир",
        "Максим",
        "Егор",
        "Александр"
    ];

    let index = getRandomPositiveInteger(0, names.length-1)

    return names[index];
}

function generateComments()
{   
    let count = getRandomPositiveInteger(5, 15);
    return Array.from({ length: count}, (_, index) => {
        let id = index+1;
        let avatarNumber = getRandomPositiveInteger(1, 6);
        return {
            id:id,
            avatar:`img/avatar-${avatarNumber}.svg`,
            message: getRandomMessage(),
            name: getRandomName()
        }
    });
}

function generateImages()
{
    return Array.from({ length: 25 }, (_, index) => {
        let id = index+1;
        return {
            id:id,
            url:`photos/${id}.jpg`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: getRandomPositiveInteger(15, 200),
            comments: generateComments(),
        }
    });
}

export { generateImages }
