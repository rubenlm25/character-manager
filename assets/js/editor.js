import 'regenerator-runtime/runtime'
let dataidJSON = localStorage.getItem('idedit');
let dataid = dataidJSON && JSON.parse(dataidJSON);
console.log(dataid);
// let inputname;
// let inputshortdescription;
// let inputdescritpion;
let jsonuser;
let datas;
let image;
let img;
console.log("hello");
//get the user
const axios = require('axios');
async function makeGetRequest() {

  let res = await axios.get('https://character-database.becode.xyz/characters/' + dataid);
  datas = res.data;
  console.log(datas);
  
  
  ////////////////////////////////////////////////////////////////////////////////
  // complete with actual user in input and text area
  document.getElementById("edit-description").innerHTML = datas.description;
  document.getElementById("edit-shortdescription").innerHTML = datas.shortDescription;
  document.getElementById("edit-name").value = datas.name;
  document.getElementById("preview").src = "data:image;base64,"+ datas.image;
  ///////////////////////////////////////////////////////////////////////////////////////////
}
makeGetRequest();

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

//clic for edit
document.getElementById("button-edit").addEventListener("click", async () => {
  let inputname = document.getElementById("edit-name").value;
  let inputdescription = document.getElementById("edit-description").value;
  let inputshortdescription = document.getElementById("edit-shortdescription").value;

  image = document.getElementById("preview");
    
  img= image.src
      .replace('data:', '')
      .replace(/^.+,/, '');
      console.log("dans fonction:", img);


  editcharacter(inputname, inputdescription, inputshortdescription);

  // verification all value complete
  async function editcharacter(name, description, shortdescription) {
    let params = {
          name: name,
          shortDescription: shortdescription,
          description: description,
          image : img
        }
        let res = await axios.put('https://character-database.becode.xyz/characters/'+dataid, params);
        console.log(res.data);
        window.location = "./index.html";
      }     
 
      
    });
    /////////////////////////////////////////////////