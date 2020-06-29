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
            a.querySelector(".openchar").setAttribute("id", resp.data[i].id)
            a.querySelector(".shortdesc").textContent += resp.data[i].shortDescription;
            a.querySelector(".delete").setAttribute("data-id", resp.data[i].id);
            a.querySelector(".edit").setAttribute("data-id", resp.data[i].id);
            

            document.querySelector(".mainchart").appendChild(a);
        }
        
        let clickedid;

        document.querySelectorAll(".openchar").forEach(function(el){
            el.addEventListener("click", function() {
                clickedid = this.id;
                console.log(clickedid);
            });
        });

        document.querySelectorAll(".delete").forEach(function(el){
            el.addEventListener("click", function() {
                let dataid = this.getAttribute("data-id");
                console.log(dataid);
            });
        });

        document.querySelectorAll(".edit").forEach(function(el){
            el.addEventListener("click", function() {
                let dataid = this.getAttribute("data-id");
                console.log(dataid);
            });
        });
    })
    
    
    
})();