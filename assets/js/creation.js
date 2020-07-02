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

document.getElementById("image-selector").addEventListener("change", ()=>{
    readImage(document.getElementById("image-selector"), document.getElementById("preview"));  
});

function readImage(imageSelector, imagePreview) {
        const imageSelectorInput = imageSelector.files[0];
        const imagePreviewElement = imagePreview;

        const reader = new FileReader();
        reader.readAsDataURL(imageSelectorInput);
        reader.addEventListener('load', (event) => {
            imagePreviewElement.src = event.target.result;
        });
    }

document.getElementById("run-creation").addEventListener("click", () => {
    // put a value in variable
    name = document.getElementById("name-creation").value;
    shortdescription = document.getElementById("short-description-creation").value;
    description = document.getElementById("description-creation").value;

    image = document.getElementById("preview");
    console.log(image);
    if(name =="" || shortdescription == "" || description == "" ||document.getElementById("image-selector").value == ""){
        alert("complete all field please");
    }
    else{


    img= image.src
        .replace('data:', '')
        .replace(/^.+,/, '');
        console.log("dans fonction:", img);
        addcharacter(name, description, shortdescription, img);
    }

    
    // verification all value complete
    async function addcharacter(name, description, shortdescription, image) {
        let params = {
            name: name,
            shortDescription: shortdescription,
            image: img,
            description: description
        }
        let res = await axios.post('https://character-database.becode.xyz/characters', params);
        console.log(res.data);
        window.location = "./index.html"
    }

    
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


})();
