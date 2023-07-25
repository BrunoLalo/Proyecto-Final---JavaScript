const main = document.querySelector('#main');
const calculo = document.querySelector('#calc');
const nombre = document.querySelector('#nombre');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');

function guardarResultado (resultado, condicion){
    const datos = {
        nombre: nombre.value,
        resultado: resultado.toFixed(2),
        condicion: condicion
    };
    const datosJSON = JSON.stringify(datos);
    localStorage.setItem('resultadoIMC', datosJSON);

    let datosPantalla = localStorage.getItem('resultadoIMC');
}

calculo.addEventListener("click",() => {
    const peso = parseInt(pesoInput.value);
    const altura = parseInt(alturaInput.value) / 100;
    const sexo = document.getElementById('sexo').value
    const res = peso / Math.pow(altura, 2);

    let resultado = "";
    switch (sexo) {
        case "m":
            if (res < 20) {
                resultado = "peso inferior al normal.";
            }
            else if (res >= 20 && res < 24) {
                resultado = "peso Normal.";
            }
            else if (res >= 24 && res < 29) {
                resultado = "peso superior al normal.";
            }
            else {
                resultado = "obesidad.";
            }
            break
        case "h":
            if (res < 21) {
                resultado = "peso inferior al normal.";
            }
            else if (res >= 21 && res < 25) {
                resultado = "peso Normal.";
            }
            else if (res >= 25 && res < 30) {
                resultado = "peso superior al normal.";
            }
            else {
                resultado = "obesidad";
            }
            break
        default:
            resultado = "no se ha podido calcular.";
    }

    const mensaje = document.createElement("p");
    mensaje.classList.add('mensaje');

    main.innerHTML +=  "<p class='mensaje'>" +"Tu IMC es de: " + res.toFixed(2) +  ", y tu condición " +resultado + "</p>";

    guardarResultado(res, resultado);

});

