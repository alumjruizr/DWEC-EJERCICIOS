let xhr;
let arrayFotosApod = [];

window.onload = () => {
    document
        .getElementById("cargaXML")
        .addEventListener("click", cargarFotosXML);
    
    document
        .getElementById("selectApod").onclick = generarLista;
        //.addEventListener("click", generarLista);

    document
        .getElementById("cargaFetch")
        .addEventListener("click", cargarFotosFetch);

}

function cargarFotosXML() {
    let numeroFotos =  document.getElementById("cantidadFotos").value;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = comprobar;
        xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${numeroFotos}`);
        xhr.send();
    }
}

function cargarFotosFetch() {
    let numeroFotos =  document.getElementById("cantidadFotos").value;
    fetch (`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${numeroFotos}`)
    .then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json();
        }
    })
    .then((datos) => {
        let fotosJson = [];
        mensajes.innerHTML += `${document.getElementById("cantidadFotos").value} Fotos cargadas desde APOD </br>`;
        fotosJson = filtrarCampos(datos);
        rellenarSelect(fotosJson);
        console.log(fotosJson);
        return datos;
    });

}

function comprobar() {
    let fotosJson = [];
    if (xhr.readyState === 4 && xhr.status === 200) {
        let jsonContent = JSON.parse(xhr.responseText);
        mensajes.innerHTML += `${document.getElementById("cantidadFotos").value} Fotos cargadas desde APOD </br>`;
        fotosJson = filtrarCampos(jsonContent);
        rellenarSelect(fotosJson);
        console.log(fotosJson);
    }
}

function filtrarCampos(fotos) {
    arrayFotosApod = [];
    fotos.forEach((foto) => {

        let fotoJson = {
            image: foto.url,
            title: foto.title,
            explanation: foto.explanation,
            date: foto.date,            
        };
        arrayFotosApod.push(fotoJson);

    });
    console.log(arrayFotosApod);
    return arrayFotosApod;
}

function generarLista(){
    let fotosJson = arrayFotosApod;
    let resultados = document.getElementById("resultados");
    let selectOption = document.getElementById("selectApod");
    let valueOption = selectOption.value;

    resultados.innerHTML = "";
    
    for (const foto of fotosJson) {

    if (valueOption === foto.title){
        let div = document.createElement("div");
        resultados.appendChild(div);

        let img = document.createElement("img");
        img.setAttribute("src", fotosJson[i].image)
        div.appendChild(img);

        let name = document.createElement("h1");
        name.innerHTML = fotosJson[i].title;
        div.appendChild(name);

        let explanation = document.createElement("p");
        explanation.innerHTML = fotosJson[i].explanation;
        div.appendChild(explanation);

        let date = document.createElement("p");
        date.innerHTML = fotosJson[i].date;
        div.appendChild(date);

        //let button = createElement("button");
        //div.appendChild(created);
    }

    }
    
}

function rellenarSelect(fotosJson) {
    let selectNuevo;
    let selectApod = document.getElementById("selectApod");
    selectApod.innerHTML = "";
    fotosJson.forEach((foto) => {
        selectNuevo = document.createElement("option");
        selectApod.appendChild(selectNuevo);
        selectNuevo.setAttribute("value", foto.title);
        //selectNuevo.setAttribute("onclick", generarLista)
        let text = document.createTextNode(foto.title);
        selectNuevo.appendChild(text);
    }); 
}

function setAtt(e, att, value) {
    e.setAttribute(att, value);

}