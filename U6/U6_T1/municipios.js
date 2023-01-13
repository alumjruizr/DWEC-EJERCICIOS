//Devuelve el número de párrafos del texto.
let numeroParrafos = document.getElementsByTagName("p").length;

//El texto del segundo párrafo.
let textoSegundoParrafo = document.getElementsByTagName("p")[1].textContent;

//El número de enlaces de la página.
let numeroEnlaces = document.getElementsByTagName("a").length;

//La dirección del primer enlace.
let direccionPrimerEnlace = document.getElementsByTagName("a")[0];

//La dirección del penultimo enlace.
let direccionPenultimoEnlace = "";
if(document.getElementsByTagName("a").length > 1) {
direccionPenultimoEnlace = document.getElementsByTagName("a")[document.getElementsByTagName("a").length - 2];
} else {console.log("Solo hay un enlace.")}

//El número de enlaces que apuntan a /wiki/Municipio.
let EnlacesWiki = document.getElementsByTagName("a");
let contadorEnlacesWiki = 0;
for (enlace of EnlacesWiki) {
    if (enlace.href.includes("/wiki/Municipio")) {
        contadorEnlacesWiki++;
    }
}
numeroEnlacesWiki = contadorEnlacesWiki;

//El número de enlaces del primer párrafo.
let primerParrafo = document.getElementsByTagName("p")[0];
let enlacesPrimerParrafo = primerParrafo.getElementsByTagName("a");
let numeroEnlacesPrimerParrafo = enlacesPrimerParrafo.length;


let info = document.getElementById("info");
info.innerHTML = "<b>Número de párrafos: </b>" + numeroParrafos + "<br>" + "<b>Texto del segundo párrafo: </b>" + textoSegundoParrafo + "</br>" 
+ "<b>Número de enlaces de la página: </b>" + numeroEnlaces + "</br>" + "<b>Texto del primer enlace: </b>" + direccionPrimerEnlace.href + "</br>"
+ "<b>Dirección del penúltimo enlace: </b>" + direccionPenultimoEnlace + "</br>" + "<b>Número de enlaces que apuntan a /wiki/Municipio: </b>" + numeroEnlacesWiki + "</br>"
+ "<b>El número de enlaces del primer párrafo: </b>" + numeroEnlacesPrimerParrafo;

console.log(enlacesPrimerParrafo);