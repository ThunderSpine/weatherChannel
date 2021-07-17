let ciudad = document.querySelector('#ciudad');
let temperatura = document.querySelector('#temperatura');
let unidad = document.querySelector('#grados');
let wicon = document.querySelector('#wicon');
let descripcion = document.querySelector('#descripcion');
let contenedor = document.querySelector(".container");
let botonEnviar = document.querySelector('#botonEnviar');
let ciudadIngresada = document.querySelector("#ciudadIngresada");

let procesamiento = (info) => {
	let iconoId = info.weather[0].icon;
	ciudad.textContent = info.name;
	temperatura.textContent =info.main.temp;
	unidad.innerHTML = '<sup>°C</sup>';
	wicon.setAttribute('src', `http://openweathermap.org/img/wn/${iconoId}@2x.png`);
	descripcion.textContent = info.weather[0].description;
	contenedor.style.visibility = "visible";
	ciudadIngresada.value = '';
};

let cargarCiudad = (city) => {
	$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=26e9ba6ba308d83d172cb1f150e3aba7`, (info) => {
		procesamiento(info)
	}).fail(()=>{
		alert('No se encontró el lugar ingresado.')
		ciudadIngresada.value = ''
	});
};

let procesoDisparador = () => {
	let ciudad = ciudadIngresada.value;
	ciudad === ''
		? alert('Debes ingresar el nombre de una ciudad.')
		:	cargarCiudad(ciudad);
};

botonEnviar.addEventListener('click', procesoDisparador);
ciudadIngresada.addEventListener('keydown', (e) => {
	if (e.keyCode === 13){
		procesoDisparador();
	}
});