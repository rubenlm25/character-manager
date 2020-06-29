(() => {
    const axios = require('axios');
    axios.get("https://character-database.becode.xyz/characters")
    .then(resp => {
        console.table(resp.data);
        let template, item, a;
        template = document.getElementById("cardmodel");
        item = template.content.querySelector("section");
        for (i=0; i < resp.data.length; i++) {
            a = document.importNode(item, true);

            a.getElementsByTagName("img")[0].src = "data:image/gif;base64,"+ resp.data[i].image;
            a.querySelector(".name").textContent += resp.data[i].name;
            a.setAttribute("id", resp.data[i].id)
            a.querySelector(".shortdesc").textContent += resp.data[i].shortDescription;
            

            document.querySelector(".mainchart").appendChild(a);
        }
        
        let clickedid;

        document.querySelectorAll(".cards").forEach(function(el){
            el.addEventListener("click", function() {
                clickedid = this.id;
                console.log(clickedid);
            });
        });
    })
    
    
    
})();