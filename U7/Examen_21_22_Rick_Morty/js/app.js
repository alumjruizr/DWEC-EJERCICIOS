/* Variables del estado */

let READY_STATE_UNINITIALIZED = 0;
let READY_STATE_LOADING = 1;
let READY_STATE_LOADED = 2;
let READY_STATE_INTERACTIVE = 3;
let READY_STATE_COMPLETE = 4;


let HTTP_STATUS_OK = 200;
let HTTP_STATUS_NOT_FOUND = 404;
let HTTP_STATUS_SERVER_ERROR = 500;

/* Petición XMLHttpRequest */

let xhr;

let personajes = [];

window.onload = init;

function init() {
    console.log(personajes)
    getID("xmlButton").addEventListener("click", cargaXML);
    getID("fetchButton").addEventListener("click", cargaFetch);
    getID("saveButton").addEventListener("click", cargaSave);
}

function cargaSave() {

    let idHTML = parseInt(getID("select").value);

    let character;


    for (let i = 0; i < personajes.length; i++) {
        if (personajes[i].id === idHTML) {
            character = personajes[i]
            console.log(character)
        }

    }

    for (let i = 0; i < character.episode.length; i++) {
        fetch(character.episode[i])
            .then((response) => response.json())
            .then((data) => {
                getID("resultado").innerHTML += `<br>Episodio ${data.name} cargado`;
                saveEpisode(data);
            })
            .catch((err) => console.log(err));
    }

}

function saveEpisode(episode) {
    fetch("guardar_episodio_rm.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(episode),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            getID("resultado").innerHTML += "<br>" + data.resultado;

        })
        .catch((err) => console.log(err));
}

function cargaFetch() {
    personajes = [];
    for (let i = parseInt(getID("min").value); i < parseInt(getID("max").value) + 1; i++) {
        fetch(`https://rickandmortyapi.com/api/character/${i}`)
            .then((response) => response.json())
            .then((data) => {
                personajes.push(data);
                getID("resultado").innerHTML += `<br>Personaje ${data.name} cargado`;
                processPersonajes(personajes);
                generateSelect();
            })
            .catch((err) => console.log(err));

    }

}

function cargaXML() {
    personajes = [];
    for (let i = parseInt(getID("min").value); i < parseInt(getID("max").value) + 1; i++) {
        if (window.XMLHttpRequest) {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = checkStatus => {
                if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === HTTP_STATUS_OK) {
                    let jsonContent = JSON.parse(xhr.responseText);
                    personajes.push(jsonContent);
                    getID("resultado").innerHTML += `<br>Personaje ${jsonContent.name} cargado`;
                    processPersonajes(personajes);
                    generateSelect();
                };
            }
            xhr.open(
                "GET",
                `https://rickandmortyapi.com/api/character/${i}`
            );
            xhr.send();

        } else {
            alert("No tiene soporte para AJAX");
        }
    }

}

function processPersonajes(pjArray) {

    let characters = getID("personajes");

    characters.innerHTML = "";

    for (let i = 0; i < pjArray.length; i++) {

        let div = createElem("div");
        characters.appendChild(div);

        let img = createElem("img");
        setAtt(img, "src", pjArray[i].image);
        div.appendChild(img);

        let name = createElem("h1");
        let nameTxt = createTxt(pjArray[i].name);
        name.appendChild(nameTxt);
        div.appendChild(name);

        let specie = createElem("p");
        let specieTxt = createTxt(pjArray[i].species);
        specie.appendChild(specieTxt);
        div.appendChild(specie);

        let location = createElem("p");
        let locationTxt = createTxt(pjArray[i].location.name);
        location.appendChild(locationTxt);
        div.appendChild(location);

        let created = createElem("p");
        let createdTxt = createTxt(pjArray[i].created);
        created.appendChild(createdTxt);
        div.appendChild(created);
    }

}

function generateSelect() {
    let select = getID("select");

    select.innerHTML = "";

    for (let i = 0; i < personajes.length; i++) {

        let option = createElem("option");
        let optionTxt = createTxt(personajes[i].name);
        setAtt(option, "value", personajes[i].id);
        option.appendChild(optionTxt);
        select.appendChild(option);
    }
}







function createElem(e) {
    return document.createElement(e);
}

function getID(id) {
    return document.getElementById(id);
}

function setAtt(e, att, value) {
    e.setAttribute(att, value);

}

function createTxt(txt) {
    return document.createTextNode(txt);

	if (XMLHttpRequest) {
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				procesar_xml(xhr.responseXML);
			}
		};
		rangoPersonajesCargar.forEach(element => {
			xhr.open("GET", "https://rickandmortyapi.com/api/character/" + element);
			
		});
		xhr.send();
	}
}

function calcularRangoPersonajes() {
	let numeroMin = document.getElementById("min");
	let numeroMax = document.getElementById("max");

	for (let num = numeroMin; index < numeroMax; index++) {
		rangoPersonajesCargar.push(num);
	}
}