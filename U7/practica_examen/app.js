let listaSuperheroes = [];
let xhr;

const READY_STATE_COMPLETE = 4;


window.onload = () => {
    document
        .getElementById("cargaPersonajes")
        .addEventListener("click", cargaPersonajes);

    document
        .getElementById("limpiarTabla")
        .addEventListener("click", limpiarTabla);

    mensajes = document.getElementById("mensajes");

};

function cargaPersonajes() {
    console.log("Cargando personajes desde remoto.")

    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = comprobar;
        xhr.open("GET", "https://gateway.marvel.com:443/v1/public/characters?events=238&orderBy=name&limit=10&apikey=2a9d1e9e0bc05aad82dca935e45b5871");
        xhr.send();
    }
}

function comprobar() {
    if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
        let jsonContent = JSON.parse(xhr.responseText);
        let data = jsonContent.data;
        mensajes.innerHTML = "Personajes cargados desde Marvel";
        listaSuperheroes = filtrarCampos(data.results);
        generarTabla(listaSuperheroes);
        console.log(jsonContent);
    }
}

function filtrarCampos(listaSuperheroes) {
    superheroesFiltrados = [];
    listaSuperheroes.forEach((superheroe) => {

        let superheroeJson = {
            id: superheroe.id,
            name : superheroe.name,
            description: superheroe.description,
            thumbnail : superheroe.thumbnail,
        };
        superheroesFiltrados.push(superheroeJson);

    });
    console.log(superheroesFiltrados);
    return superheroesFiltrados;
}

function generarTabla(superheroes) {
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = "";

    let tabla = document.createElement("table");
    tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
    let tr = document.createElement("tr");

    let rotulos = [
        "id",
        "name",
        "description",
        "image",
    ];

    rotulos.forEach((rotulo) => {
        let th = document.createElement("th");
        th.setAttribute("style", "border: solid 2px");
        th.appendChild(document.createTextNode(rotulo));
        tr.appendChild(th);
    });
    tabla.appendChild(tr);
    
    superheroes.forEach((superheroe) => {
        let option = document.createElement("option");
        option.setAttribute("value", superheroe.id);
        option.appendChild(document.createTextNode(superheroe.id));

        let tr = document.createElement("tr");
        for (const item in superheroe) {
            if (item === "thumbnail") {
                td = document.createElement("td");
                td.setAttribute("style", "border: solid 2px");
                let img = document.createElement("img");
                img.src = superheroe.thumbnail.path+"."+superheroe.thumbnail.extension;
                td.appendChild(img);
                tr.appendChild(td);
            } else {
            let td = document.createElement("td");
            td.setAttribute("style", "border: solid 2px");
            td.appendChild(document.createTextNode(superheroe[item]));
            tr.appendChild(td);
            }
        }
        /*let td = document.createElement("td");
        let button = document.createElement("button");
        td.appendChild(button);
        button.setAttribute("onclick", "guardarCriminal()");
        button.appendChild(document.createTextNode("Guardar"));
        tr.appendChild(td);*/

        tabla.appendChild(tr);
    });

    divTabla.appendChild(tabla);
}

function limpiarTabla() {
    mensajes.innerHTML = "Tabla limpiada.";
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = " ";
}