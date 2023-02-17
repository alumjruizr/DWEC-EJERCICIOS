let xhr;

let rangoPersonajesCargar = [];

window.onload = () => {
    document
            .getElementById("cargaXML")
            .addEventListener("click", cargaXML);
    document
            .getElementById("cargaFecth")
            .addEventListener("click", cargaFetch);
}

function cargar_datos_xml() {
	console.log("cargaXML");

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