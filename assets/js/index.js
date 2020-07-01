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

            a.setAttribute("id", resp.data[i].id)
            a.getElementsByTagName("img")[0].src = "data:image/jpeg;base64,"+ resp.data[i].image;
            a.querySelector(".name").textContent += resp.data[i].name;
            a.querySelector(".openchar").setAttribute("data-id", resp.data[i].id)
            a.querySelector(".shortdesc").textContent += resp.data[i].shortDescription;
            a.querySelector(".delete").setAttribute("data-id", resp.data[i].id);
            a.querySelector(".edit").setAttribute("data-id", resp.data[i].id);
            

            document.querySelector(".mainchart").appendChild(a);
        }
        
    

        document.querySelectorAll(".openchar").forEach(function(el){
            el.addEventListener("click", function() {
                let clickedid = this.getAttribute("data-id");
                console.log(clickedid);
                let selectedchar = resp.data.find(element => element.id == clickedid)
                console.table(selectedchar)

                document.querySelector(".singleimg").src = "";
                document.querySelector(".singleimg").src = "data:image/jpeg;base64,"+ selectedchar.image;
                document.querySelector(".mainname").textContent = selectedchar.name;
                document.querySelector(".desctext").textContent = selectedchar.description;
                document.getElementById("togglemain").style.display = "grid";
                document.querySelector(".mainedit").setAttribute("data-id", selectedchar.id);
                document.querySelector(".maindelete").setAttribute("data-id", selectedchar.id);
            });
        });

        document.getElementById("togglemain").addEventListener("click", ()=> {
            document.getElementById("togglemain").style.display = "none";
        });




        document.querySelectorAll(".delete").forEach(function(el){
            el.addEventListener("click", function() {
                let dataid = this.getAttribute("data-id");
                console.log(dataid);

                if (confirm("Are you sure you want to delete this character?")) {
                    axios.delete("https://character-database.becode.xyz/characters/"+dataid);
                    const nodetoremove = document.getElementById(dataid);
                    console.log(nodetoremove);
                    nodetoremove.parentNode.removeChild(nodetoremove)
                }



            });
        });

        document.querySelectorAll(".edit").forEach(function(el){
            el.addEventListener("click", function() {
                let dataid = this.getAttribute("data-id");

                console.log(dataid);
                // localStorage.setItem("idedit", JSON.stringify(dataid));
                window.location = "./editor.html";
            });
        });

        document.querySelector(".maindelete").addEventListener("click", ()=> {
            let dataid = document.querySelector(".maindelete").getAttribute("data-id");
            console.log(dataid);

            if (confirm("Are you sure you want to delete this character?")) {
                axios.delete("https://character-database.becode.xyz/characters/"+dataid);
                const nodetoremove = document.getElementById(dataid);
                console.log(nodetoremove);
                nodetoremove.parentNode.removeChild(nodetoremove);
                document.getElementById("togglemain").style.display = "none";
            }


        });

        document.querySelector(".mainedit").addEventListener("click", ()=>{
            let dataid = document.querySelector(".mainedit").getAttribute("data-id");

            console.log(dataid);
            localStorage.setItem("idedit", JSON.stringify(dataid));
            window.location = "./editor.html";
        });

        document.querySelector(".addnewchar").addEventListener("click", ()=> {
            window.location = "./creation.html";
        });
            
    })
    
    
    
})();