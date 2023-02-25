let xhr;
const READY_STATE_COMPLETE = 4;
let mensajes;
let vehiculosJson = [];

window.onload = () => {
	document
		.getElementById("cargaVehiculos")
		.addEventListener("click", cargaVehiculos);

	document
		.getElementById("registrarEnvio")
		.addEventListener("click", cargaVehiculos);

	mensajes = document.getElementById("mensajes");
};

function cargaVehiculos() {
    console.log("Cargando vehículos")

	if (XMLHttpRequest) {
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = comprobar;
		xhr.open("GET", "vehiculos.json");
		xhr.send();
	}
}

function comprobar() {
	console.log("comprobar");
	if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
		mensajes.innerHTML = "Datos desde XML cargados";
		console.log("comprobar ok");
		console.log(JSON.parse(xhr.responseText));
		let vehiculos = JSON.parse(xhr.responseText);

		// Lo hemos hecho de las dos maneras posibles. En el ejercicio no haría falta. Sólo una sería suficiente
		// insertar_comunidades_fetch(comunidades_json);
		insertarVehiculosXML(vehiculos);
	}
}

function insertarVehiculosXML(vehiculos) {
	console.log("insertarVehiculosXML");
	// Lo hacemos con  XMLHttpRequest. No haría falta según el enunciado, solamente con uno de ellos.

	xhr = new XMLHttpRequest();
	xhr.open("POST", "insertar_vehiculos.php");
	xhr.setRequestHeader("Content-type", "application/json");
	let vehiculosJson = JSON.stringify(vehiculos);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
			let vehiculoJson = JSON.parse(xhr.responseText);
			console.log(vehiculoJson);
			construirTabla(vehiculoJson);
		}
	};
	xhr.send(vehiculosJson);
}



function construirTabla(vehiculosJson) {
    let divTabla = document.getElementById("tabla");
	divTabla.innerHTML = "";

    let tabla = document.createElement("table");
	tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
	let tr = document.createElement("tr");

    let rotulos = [
		"id",
		"name",
		"description",
		"vehicle_class",
	];

    rotulos.forEach((rotulo) => {
		let th = document.createElement("th");
		th.setAttribute("style", "border: solid 2px");
		th.appendChild(document.createTextNode(rotulo));
		tr.appendChild(th);
	});
	tabla.appendChild(tr);

    vehiculosJson.forEach((vehiculo) => {
        let tr = document.createElement("tr");
		for (const item in vehiculo) {
			let td = document.createElement("td");
			td.setAttribute("style", "border: solid 2px");
			td.appendChild(document.createTextNode(vehiculo[item]));
			tr.appendChild(td);
		}

		tabla.appendChild(tr);
    })
    
    console.log("Hola")


}