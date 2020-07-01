import 'regenerator-runtime/runtime'
let dataidJSON = localStorage.getItem('idedit');
let dataid = dataidJSON && JSON.parse(dataidJSON);
console.log(dataid);
// let inputname;
// let inputshortdescription;
// let inputdescritpion;
let jsonuser;
let datas;
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
  ///////////////////////////////////////////////////////////////////////////////////////////
}
makeGetRequest();
//clic for edit
document.getElementById("button-edit").addEventListener("click", async () => {
  let inputname = document.getElementById("edit-name").value;
  let inputdescription = document.getElementById("edit-description").value;
  let inputshortdescription = document.getElementById("edit-shortdescription").value;



  editcharacter(inputname, inputdescription, inputshortdescription);

  // verification all value complete
  async function editcharacter(name, description, shortdescription) {
    let params = {
          name: name,
          shortDescription: shortdescription,
          description: description
        }
        let res = await axios.put('https://character-database.becode.xyz/characters/'+dataid, params);
        console.log(res.data);
        window.location = "./index.html";
      }     
 
      
    });
    /////////////////////////////////////////////////