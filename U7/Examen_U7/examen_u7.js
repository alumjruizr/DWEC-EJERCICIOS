let listaSuperheroes = [];
let xhr;

const API_BASE_URL = "https://gateway.marvel.com/";
const PRIVATE_API_KEY = "aff9d69b74d70fb78060c5a1fe743894279f955e";
const PUBLIC_API_KEY = "2a9d1e9e0bc05aad82dca935e45b5871";
const TS = "1000";
const HASH = md5(TS + PRIVATE_API_KEY + PUBLIC_API_KEY)


window.onload = () => {
    document
        .getElementById("cargaPersonajes")
        .addEventListener("click", cargaPersonajes);

    document
        .getElementById("limpiarTabla")
        .addEventListener("click", limpiarTabla);

    document
        .getElementById("guardarPersonajes")
        .addEventListener("click", saveXML);

    document
        .getElementById("cargaFetch")
        .addEventListener("click", cargaFetch)

    mensajes = document.getElementById("mensajes");

};

function cargaPersonajes() {
    console.log("Cargando personajes desde remoto.")

    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = comprobar;
        //API_BASE_URL+"/v1/public/characters?apikey="+PUBLIC_API_KEY+"&hash="HASH+"&ts="+TS+"&limit=1000&offset=0"
        xhr.open("GET", API_BASE_URL+"/v1/public/characters?apikey="+PUBLIC_API_KEY+"&hash="+HASH+"&ts="+TS+"&limit=10&offset=0");
        xhr.send();
    }
}

function comprobar() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let jsonContent = JSON.parse(xhr.responseText);
        let data = jsonContent.data;
        mensajes.innerHTML = "Personajes cargados desde Marvel";
        listaSuperheroes = filtrarCampos(data.results);
        card(listaSuperheroes);
        console.log(jsonContent);
    }
}

function filtrarCampos(listaSuperheroes) {
    superheroesFiltrados = [];
    listaSuperheroes.forEach((superheroe) => {

        let superheroeJson = {
            name : superheroe.name,
            thumbnail : superheroe.thumbnail,
            modified: superheroe.modified,
            comics : superheroe.comics.items,
            id: superheroe.id,
            
        };
        superheroesFiltrados.push(superheroeJson);

    });
    console.log(superheroesFiltrados);
    return superheroesFiltrados;
}

function saveXML() {

    let personajesGuardar = []
    let loGuardo;
    for (const personaje in listaSuperheroes) {
        loGuardo = document.getElementById(listaSuperheroes[personaje].id)
        if (loGuardo.checked === true) {
            let superheroeJson = {
                             
                id: listaSuperheroes[personaje].id,
                name : listaSuperheroes[personaje].name,
                modified: listaSuperheroes[personaje].modified,
                path : listaSuperheroes[personaje].thumbnail.path+"."+listaSuperheroes[personaje].thumbnail.extension,
                
            };
            personajesGuardar.push(superheroeJson);
            mensajes.innerHTML += `<br>Personaje ${listaSuperheroes[personaje].name} guardado.`;        
        }
    }

    if (XMLHttpRequest) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_marvel_characters.php');
        xhr.setRequestHeader("Content-type", "application/json");
        let superheroesGuardar = JSON.stringify(personajesGuardar);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let superheroe = JSON.parse(xhr.responseText);
                console.log(superheroe);
            }
        };
        xhr.send(superheroesGuardar);
    }
}



function limpiarTabla() {
    mensajes.innerHTML = "Lista limpiada.";
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = " ";
}

function card(superheroes) {
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = "";

    superheroes.forEach((superheroe) => {
    
        let div = document.createElement("div");
        div.setAttribute("class", "card");
        div.setAttribute("style", "margin-bot: 2pt; width: 25%;")
        divTabla.appendChild(div);

        let img = document.createElement("img");
        img.src = superheroe.thumbnail.path+"."+superheroe.thumbnail.extension;
        img.setAttribute("class", "card-img-top")
        div.appendChild(img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        div.appendChild(cardBody);

        let h5 = document.createElement("ht5");
        h5.setAttribute("class", "card-title");
        h5.appendChild(document.createTextNode(superheroe.name));
        cardBody.appendChild(h5);

        let fecha = document.createElement("p");
        fecha.setAttribute("class", "card-text");
        fecha.appendChild(document.createTextNode(superheroe.modified));
        cardBody.appendChild(fecha);

        let arrayComics = superheroe.comics;
        let ul = document.createElement("ul");
        cardBody.appendChild(ul);
        for (const comic in arrayComics) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(arrayComics[comic].name));
            ul.appendChild(li);
        }

        let switchCard = document.createElement("div");
        switchCard.setAttribute("class", "form-check form-switch")
        div.appendChild(switchCard);

        let labelSwitch = document.createElement("label");
        labelSwitch.setAttribute("class", "custom-control-label");
        labelSwitch.setAttribute("for", superheroe.id);
        labelSwitch.appendChild(document.createTextNode("Guardar"));
        switchCard.appendChild(labelSwitch);

        let inputSwitch = document.createElement("input");
        inputSwitch.setAttribute("type", "checkbox");
        inputSwitch.setAttribute("class", "form-check-input");
        inputSwitch.setAttribute("id", superheroe.id)
        switchCard.appendChild(inputSwitch);


    });

    let div = document.createElement("div");   
}

function cargaFetch() {
    fetch("get_marvel_characters.php")
    .then((respuesta) => {
        if (respuesta.ok) return respuesta.json();
    })
    .then((personajes) => {
        mensajes.innerHTML = "Datos desde fetch cargados";
        cardFetch(personajes);
    })
    .catch((err) => console.log(err));
}

function cardFetch(superheroes) {
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = "";

    superheroes.forEach((superheroe) => {
    
        let div = document.createElement("div");
        div.setAttribute("class", "card");
        div.setAttribute("style", "margin-bot: 2pt; width: 25%;")
        divTabla.appendChild(div);

        let img = document.createElement("img");
        img.src = superheroe.path;
        img.setAttribute("class", "card-img-top")
        div.appendChild(img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        div.appendChild(cardBody);

        let h5 = document.createElement("ht5");
        h5.setAttribute("class", "card-title");
        h5.appendChild(document.createTextNode(superheroe.name));
        cardBody.appendChild(h5);

        let fecha = document.createElement("p");
        fecha.setAttribute("class", "card-text");
        fecha.appendChild(document.createTextNode(superheroe.modified));
        cardBody.appendChild(fecha);

    });

    let div = document.createElement("div");   
}