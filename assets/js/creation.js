(() => {
import 'regenerator-runtime/runtime'
let name;
let shortdescription;
let image;
let description;
let reader;
let img;
let dataURL;
let test;
const axios = require('axios');

function encodeImageFileAsURL(){
    let file = this.files[0];
    reader= new FileReader();
    reader.onloadend = function() {
        result = reader.result;
        img = result.substring(23, result.length)
        console.log("RESULT", img)
    }
    reader.readAsDataURL(file);
}
document.getElementById("image-selector").addEventListener("change",encodeImageFileAsURL())
document.getElementById("run-creation").addEventListener("click", () => {
    // put a value in variable
    name = document.getElementById("name-creation").value;
    shortdescription = document.getElementById("short-description-creation").value;
    description = document.getElementById("description-creation").value;
    console.log(image);
    
    addcharacter(name, description, shortdescription, img);
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

});
})();
