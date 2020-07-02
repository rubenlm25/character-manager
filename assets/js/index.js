(() => {
    const axios = require('axios');
    axios.get("https://character-database.becode.xyz/characters")
    .then(resp => {
        console.table(resp.data);

        // déclaration variables 
        let template, item, a;

        // enregistrement du modèle du template
        template = document.getElementById("cardmodel");
        item = template.content.querySelector("section");
        for (i=0; i < resp.data.length; i++) {
            // creation carte
            a = document.importNode(item, true);

            // remplissage carte et injection de l'id dans le HTML
            a.setAttribute("id", resp.data[i].id)
            a.getElementsByTagName("img")[0].src = "data:image;base64,"+ resp.data[i].image;
            a.querySelector(".name").textContent += resp.data[i].name;
            a.querySelector(".openchar").setAttribute("data-id", resp.data[i].id)
            a.querySelector(".shortdesc").textContent += resp.data[i].shortDescription;
            a.querySelector(".delete").setAttribute("data-id", resp.data[i].id);
            a.querySelector(".edit").setAttribute("data-id", resp.data[i].id);
            
            // ajout de la carte dans le dom
            document.querySelector(".mainchart").appendChild(a);
        }
        
    
        // page single image

        // récupération de l'id préalablement injecté dans le html sur la carte cliquée
         document.querySelectorAll(".openchar").forEach(function(el){
            el.addEventListener("click", function() {
                let clickedid = this.getAttribute("data-id");
                console.log(clickedid);

                // récupération du bon personnage sur l'API
                let selectedchar = resp.data.find(element => element.id == clickedid)
                console.table(selectedchar)

                // remplissage de la page single image et stockage de l'id pour utilisation en cas d'edit

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
            // affiche le single image page
            document.getElementById("togglemain").style.display = "none";
        });



        // suppression du personnage depuis les cartes

        document.querySelectorAll(".delete").forEach(function(el){
            el.addEventListener("click", function() {
                // récupération de l'id dans le html
                let dataid = this.getAttribute("data-id");
                console.log(dataid);

                if (confirm("Are you sure you want to delete this character?")) {
                    // suppression du perso sur l'API
                    axios.delete("https://character-database.becode.xyz/characters/"+dataid);
                    // suppression de la carte perso dans le DOM
                    const nodetoremove = document.getElementById(dataid);
                    console.log(nodetoremove);
                    nodetoremove.parentNode.removeChild(nodetoremove)
                }



            });
        });

        // édition du personnage depuis les cartes

        document.querySelectorAll(".edit").forEach(function(el){
            el.addEventListener("click", function() {
                // récupération de l'id préalablement injecté dans le HTML
                let dataid = this.getAttribute("data-id");
                console.log(dataid);
                // enregestriment dans le local storage de l'id pour le récupérer sur la page d'édition
                localStorage.setItem("idedit", JSON.stringify(dataid));
                // redirection sur la page d'édition
                window.location = "./editor.html";
            });
        });

        // suppression depuis la page single character

        document.querySelector(".maindelete").addEventListener("click", ()=> {
            // récupération de l'id préalablement injecté dans le html
            let dataid = document.querySelector(".maindelete").getAttribute("data-id");
            console.log(dataid);

            if (confirm("Are you sure you want to delete this character?")) {
                // suppression du perso dans l'API
                axios.delete("https://character-database.becode.xyz/characters/"+dataid);
                // suppression de la carte personnage du DOM
                const nodetoremove = document.getElementById(dataid);
                console.log(nodetoremove);
                nodetoremove.parentNode.removeChild(nodetoremove);
                // désafficher la single image page
                document.getElementById("togglemain").style.display = "none";
            }


        });


        // édition du personnage depuis la single character page.

        document.querySelector(".mainedit").addEventListener("click", ()=>{
            // récup id préalablement inséré dans le html dans le html
            let dataid = document.querySelector(".mainedit").getAttribute("data-id");

            console.log(dataid);
            // stockage de l'id dans le local storage poru le récupérer sur la page edit
            localStorage.setItem("idedit", JSON.stringify(dataid));
            // ouverture page d'édition
            window.location = "./editor.html";
        });

        // redirection vers la page de création du personnage
        document.querySelector(".addnewchar").addEventListener("click", ()=> {
            window.location = "./creation.html";
        });
            
    })
    
    
    
})();