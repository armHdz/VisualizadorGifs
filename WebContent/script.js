var tablaGifs = document.getElementById("tabla-gifs");
//window.onload = cargarGifs;

function cargarGifs(){
	
	let request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		console.log(this.readyState);
		if(this.readyState == 4 && this.status == 200){  //Peticiones(readyState): 1. Configuracion 2. Abre conexion 3. Manda peticion 4. Obtiene respuesta
			//tablaGifs.innerText = this.responseText;
			crearGifs(this.responseText);
		}
	};
	
	request.open("GET", "gifs.json", true);
	request.send();
}

function cargarGifsGiphy(query){
	let request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		console.log(this.readyState);
		if(this.readyState == 4 && this.status == 200){
			crearGifsGiphy(this.responseText);
		}
	};
	let url = "https://api.giphy.com/v1/gifs/search?api_key=E2mUwJf19sckOfUgjjWsfnJ6aGLlIjPJ&q=" + query;
	request.open("GET", url, true);
	request.send();
}

function buscarGifs(event){
	let txtBusqueda = document.getElementById("txtBusqueda");
	let valor = txtBusqueda.value;
	
	cargarGifsGiphy(valor);
}

function crearGifs(data){
	let listaGifs = JSON.parse(data);
	for(let i = 0; i < listaGifs.length; i++){
		let gif = listaGifs[i];
		crearElementoImg(gif);
	}
}

function crearGifsGiphy(data){
	let respuestaGiphy = JSON.parse(data);
	for(let i = 0; i < respuestaGiphy.data.length; i++){
		let imagen = respuestaGiphy.data[i];
		crearElementoImg(imagen.images.original);
	}
}

function crearElementoImg(gif){
	let contImg = document.createElement("div");
	let img = document.createElement("img");
	
	img.src = gif.url;
	
	contImg.appendChild(img);
	tablaGifs.appendChild(contImg);
}