import 'regenerator-runtime/runtime'
(() => {
let name;
let shortdescription;
let image;
let description;
let reader;
let img;
let dataURL;
let test;
let file;
const axios = require('axios');
document.getElementById("image-selector").addEventListener("change", () => {
    readImage(document.getElementById("createImgSelector"), document.getElementById("createImgPreview"));        
});

// document.getElementById("image-selector").addEventListener("change", ()=>{
//     let x = document.getElementById("image-selector").src;
//     console.log(x);
//     encodeImageFileAsURL(x);
// });

document.getElementById("run-creation").addEventListener("click", () => {
    // put a value in variable
    name = document.getElementById("name-creation").value;
    shortdescription = document.getElementById("short-description-creation").value;
    description = document.getElementById("description-creation").value;
    console.log(image);
    
    // verification all value complete
    async function addcharacter(name, description, shortdescription, image) {
        let params = {
            name: name,
            shortDescription: shortdescription,
            image: image,
            description: description
        }
        let res = await axios.post('https://character-database.becode.xyz/characters', params);
        console.log(res.data);
        
    }
    addcharacter(name, description, shortdescription, img);
    function readImage(imageSelector, imagePreview)
    {
        const imageSelectorInput = imageSelector.files[0];
        const imagePreviewElement = imagePreview;

        const reader = new FileReader();
        reader.readAsDataURL(imageSelectorInput);
        reader.addEventListener('load', (event) => {
            imagePreviewElement.src = event.target.result;
        });
    }

});
function readImage(imageSelector, imagePreview)
{
    const imageSelectorInput = imageSelector.files[0];
    const imagePreviewElement = imagePreview;

    const reader = new FileReader();
    reader.readAsDataURL(imageSelectorInput);
    reader.addEventListener('load', (event) => {
        imagePreviewElement.src = event.target.result;
    });
}

})();
