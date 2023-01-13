let lista = document.getElementById("lista");

//Función abrir prompt.
function mostrarPrompt() {
    let nuevaPalabra = prompt("Escriba una palabra");
    let lista = document.getElementById("lista");
    if(nuevaPalabra !== null && nuevaPalabra !== "") {
    lista.innerHTML += "<li>" + nuevaPalabra +"</li>";
    }
}

//Función borrar primer li.
function borrarPrimerLi() {
    let primerLi = lista.removeChild(lista.firstChild);
}

//Función borrar último li.
function borrarUltimoLi() {
    let primerLi = lista.removeChild(lista.lastChild);
}