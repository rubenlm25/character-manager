dataidJSON = localStorage.getItem('idedit');
dataid = dataidJSON && JSON.parse(dataidJSON);
let inputname;
let inputshortdescription;
let inputdescritpion;
let jsonuser;
//get the user
const axios = require('axios');
async function makeGetRequest() {

    let res = await axios.get('http://localhost:3000/users/'+dataid);
    let data = res.data;
    console.log(data);
    return(data);
  }
  jsonuser=makeGetRequest();
////////////////////////////////////////////////////////////////////////////////
// complete with actual user in input and text area
document.getElementById("edit-description").innerHTML = jsonuser.descritpion;
document.getElementById("edit-shortdescription").innerHTML = jsonuser.shortDescription;
document.getElementById("edit-name").value = jsonuser.name;
///////////////////////////////////////////////////////////////////////////////////////////
//clic for edit
document.getElementById("button-edit").addEventListener("click",async()=>{
    inputname=document.getElementById("edit-name").value;
    inputdescritpion=document.getElementById("edit-description").innerHTML;
    inputshortdescription = document.getElementById("edit-shortdescription").innerHTML;

});
/////////////////////////////////////////////////
