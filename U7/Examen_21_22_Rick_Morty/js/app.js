let xhr
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

function cargar_datos_fetch() {
	console.log("cargaFecth");
	fetch("latest.json")
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidades) => {
			resultados.innerHTML = "Datos desde fetch cargados";
			console.log(comunidades);
			insertar_comunidades_xmlhttprq(filtrar_campos(comunidades));
		});
}

