function verificar(){
	var check = document.getElementById("upload-original").value
	if(check){
		convertir();
		document.getElementById("guardar").innerHTML = '<button id="guardar" onClick="guardar()">Guardar imagen</button>'
	}
}
function convertir(){
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");
//establece el tamaño del canvas en función del tamaño de la imagen
var cw = (canvas.width = laImagen.width),
    cx = cw / 2;
var ch = (canvas.height = laImagen.height),
    cy = ch / 2;
// el texto va centrado en el centro del canvas
ctx.textAlign = "center";
ctx.textBaseline = "middle";
// el color del texto es blanco con un 50% de transparencia.
var transparencia = document.getElementById("TextoTransparencia").value/100;
var color = document.getElementById("TextoColor").value;
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
ctx.fillStyle = "rgba("+hexToRgb(color).r+","+hexToRgb(color).g+","+hexToRgb(color).b+","+transparencia+")";
// dibuja la imagen en el canvas
ctx.drawImage(laImagen, 0, 0);
// el texto para la marca de agua
var texto = document.getElementById("TextoMarca").value;
var tamano = document.getElementById("TextoTamano").value;
var tamanoTexto = tamano; // empieza con algo grande, más grande de lo que sea necesario

ctx.font = tamanoTexto + "px Arial";
// mide la anchura del texto
var anchuraTexto = ctx.measureText(texto).width;
// mientras que el texto siga demasiado grande
while (anchuraTexto > canvas.width - 20) {
  // disminuie el tamaño del texto
  tamanoTexto--;
  ctx.font = tamanoTexto + "px Georgia";
  anchuraTexto = ctx.measureText(texto).width;
}

//pinta el texto en el canvas


var aux = laImagen.height-30
var aux2 = laImagen.width-30
document.getElementById("TextoPos").max=aux
document.getElementById("TextoPos2").max=aux2
var pos = document.getElementById("TextoPos").value;
var pos2 = document.getElementById("TextoPos2").value;

ctx.fillText(texto, pos2, pos);



}


//funciones de carga de imagenes
function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
 
            reader.onload = function (e) {
                var filePreview = document.createElement('img');
                filePreview.id = 'original';
                //e.target.result contents the base64 data from the image uploaded
                filePreview.src = e.target.result;
                console.log(e.target.result);
 
                var previewZone = document.getElementById('imgoriginal');
                previewZone.innerHTML='<image class="img" id="'+filePreview.id+'" src="'+filePreview.src+'"></image>';
				document.getElementById("laImagen").src=filePreview.src
						
            }
 
            reader.readAsDataURL(input.files[0]);
        }
    }
 
    var fileUpload = document.getElementById('upload-original');
    fileUpload.onchange = function (e) {
        readFile(e.srcElement);
    }

/* 
function readFileLogo(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
 
            reader.onload = function (e) {
                var filePreview = document.createElement('img');
                filePreview.id = 'logo';
                //e.target.result contents the base64 data from the image uploaded
                filePreview.src = e.target.result;
                console.log(e.target.result);
 
                var previewZone = document.getElementById('imglogo');
                previewZone.innerHTML='<image class="img" id="'+filePreview.id+'" src="'+filePreview.src+'"></image>';
            }
 
            reader.readAsDataURL(input.files[0]);
        }
    }
 
    var fileUpload = document.getElementById('upload-logo');
    fileUpload.onchange = function (e) {
        readFileLogo(e.srcElement);
    }*/
	
	
function guardar() {  
		//var link = document.createElement('a')
		var link = document.getElementById("save")
		link.download = "imgmarcadeagua.png";
		link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		//link.click();
}