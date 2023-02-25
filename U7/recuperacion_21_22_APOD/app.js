let xhr;
let arrayFotosApod = [];

window.onload = () => {
    document
        .getElementById("cargaXML")
        .addEventListener("click", pedirFotos);
    

}

function pedirFotos() {
    let numeroFotos =  document.getElementById("cantidadFotos").value;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = comprobar;
        xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${numeroFotos}`);
        xhr.send();
    }
}

function comprobar() {
    let fotosJson = [];
    if (xhr.readyState === 4 && xhr.status === 200) {
        let jsonContent = JSON.parse(xhr.responseText);
        mensajes.innerHTML += `${document.getElementById("cantidadFotos").value} Fotos cargadas desde APOD </br>`;
        fotosJson = filtrarCampos(jsonContent);
        generarLista(fotosJson);
        rellenarSelect()
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

function generarLista(fotosJson){
    let resultados = document.getElementById("resultados");

    resultados.innerHTML = "";

    for (let i = 0; i < fotosJson.length; i++) {

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

function rellenarSelect() {

}

function setAtt(e, att, value) {
    e.setAttribute(att, value);

}