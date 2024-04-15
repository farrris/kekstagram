import { generateImages } from './mocks.js';
import { renderPictures } from './pictures.js';
import "./form.js"

const pictures = generateImages();
renderPictures(pictures);
