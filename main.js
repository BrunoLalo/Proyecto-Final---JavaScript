const main = document.querySelector('#main');
const calculo = document.querySelector('#calc');
const nombre = document.querySelector('#nombre');
const peso = parseInt(document.getElementById('peso'));
const altura = parseInt(document.getElementById('altura'));
const sexo = document.getElementById('#sexo')

let res = (peso / Math.pow(altura, 2));;


calculo.addEventListener("click",() => {
    let resultado = ""
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

    main.innerHTML += "Tu IMC es de: " + res + ", y tu condición " +resultado;
});




