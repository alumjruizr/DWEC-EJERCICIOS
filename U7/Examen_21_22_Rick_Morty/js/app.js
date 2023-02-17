let xhr;
const READY_COMPLETE_STATE = 4;

let peticiones = [];

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
		xhr.onreadystatechange = comprobar;
		xhr.open("GET", "latest.json");
		xhr.send();
	}
}

function comprobar() {
	console.log("comprobar");
	if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
		resultados.innerHTML = "Datos desde XML cargados";
		console.log("comprobar ok");
		console.log(JSON.parse(xhr.responseText));
		let characters = JSON.parse(xhr.responseText);

		// Lo hemos hecho de las dos maneras posibles. En el ejercicio no haría falta. Sólo una sería suficiente
		// insertar_comunidades_fetch(comunidades_json);
		insertar_comunidades_xmlhttprq(filtrar_campos(characters));
	}
}

function cargar_datos_fetch() {
	console.log("cargaFecth");
	fetch("latest.json")
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((characters) => {
			resultados.innerHTML = "Datos desde fetch cargados";
			console.log(characters);
			insertar_comunidades_xmlhttprq(filtrar_campos(characters));
		});
}

