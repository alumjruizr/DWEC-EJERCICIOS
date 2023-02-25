let xhr;
const READY_STATE_COMPLETE = 4;
let mensajes;
let criminalesJson = [];
let criminales = [];
let arrayBotones = [];

window.onload = () => {
    document
        .getElementById("cargaCriminalesRemoto")
        .addEventListener("click", cargaCriminales);

    document
        .getElementById("limpiarTabla")
        .addEventListener("click", limpiarTabla)

    //document
    //    .getElementsByClassName("guardarCriminal")
    //    .addEventListener("click", guardarCriminal)
 
    mensajes = document.getElementById("mensajes");
};

function cargaCriminales() {
    console.log("Cargando criminales desde remoto.")

    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = comprobar;
        xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.fbi.gov/@wanted");
        xhr.send();
    }
}

function comprobar() {
    if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
        let jsonContent = JSON.parse(xhr.responseText);
        mensajes.innerHTML = "Criminales cargados desde FBI";
        criminalesJson = filtrarCampos(jsonContent.items);
        generarTabla(criminalesJson);
        console.log(jsonContent)
    }
}

function filtrarCampos(criminales) {
    criminalesJson = [];
    criminales.forEach((criminal) => {

        let criminalJson = {
            uid: criminal.uid,
            title: criminal.title,
            description: criminal.description,
            aliases: criminal.aliases,
            image: criminal.images[0].thumb,
        };
        criminalesJson.push(criminalJson);

    });
    console.log(criminalesJson);
    return criminalesJson;
}

function generarTabla(criminales) {
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = "";

    let tabla = document.createElement("table");
    tabla.setAttribute("style", "text-align: center");
    let tr = document.createElement("tr");

    let rotulos = [
        "uid",
        "title",
        "description",
        "aliases",
        "images",
        "save",
    ];

    rotulos.forEach((rotulo) => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(rotulo));
        tr.appendChild(th);
    });
    tabla.appendChild(tr);

    criminales.forEach((criminal) => {
        let option = document.createElement("option");
        option.setAttribute("value", criminal.uid);
        option.appendChild(document.createTextNode(criminal.uid));

        let tr = document.createElement("tr");
        for (const item in criminal) {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(criminal[item]));
            tr.appendChild(td);
        }
        let td = document.createElement("td");
        let button = document.createElement("button");
        td.appendChild(button);
        button.setAttribute("onclick", "guardarCriminal()");
        button.appendChild(document.createTextNode("Guardar"));
        tr.appendChild(td);

        tabla.appendChild(tr);
    });

    divTabla.appendChild(tabla);
}

function limpiarTabla() {
    mensajes.innerHTML = "Tabla limpiada.";
    let divTabla = document.getElementById("tabla");
    divTabla.innerHTML = "";
}

function guardarCriminal() {

    let criminalToSave = 


    fetch("save_criminals.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(criminal),
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



    let nodosGuardado = document.getElementsByClassName("guardarCriminal");
    nodosGuardado.forEach((nodo) => {
        if (nodo){

        }
    });

}