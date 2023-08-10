const main = document.querySelector('#main');
const calculo = document.querySelector('#calc');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const nombre = document.querySelector('#nombre');

const resultadosIMC = []

function guardarResultado(resultado, condicion, consejo) {
    const datos = {
        nombre: nombre.value,
        resultado: resultado.toFixed(2),
        condicion: condicion,
        consejo: consejo
    };
    resultadosIMC.push(datos)
    const datosJSON = JSON.stringify(resultadosIMC);
    localStorage.setItem('resultadoIMC', datosJSON);
}

function mostrarResultado() {
    let datosPantalla = localStorage.getItem('resultadosIMC');
    resultadosIMC.forEach(dato => {

        const mensaje = document.createElement("p");
        mensaje.classList.add('mensaje');

        const datosGuardados = document.createElement("ul");
        datosGuardados.classList.add('datos');

        main.innerHTML += "<p class='mensaje'>" + "Tu cálculo fue:" + "</p>";
        main.innerHTML += "<li class='datos'>" + dato.nombre + ":   IMC: " + dato.resultado + ";  condición: " + dato.condicion + "</li>";
    })
}

calculo.addEventListener("click", () => {
    const peso = parseInt(pesoInput.value);
    const altura = parseInt(alturaInput.value) / 100;
    const sexo = document.getElementById('sexo').value
    const res = peso / Math.pow(altura, 2);

    let resultado = "";
    let consejo = "";
    switch (sexo) {
        case "m":
            if (res < 20) {
                resultado = "peso inferior al normal.";
            }
            else if (res >= 20 && res < 24) {
                resultado = "peso normal.";
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
                resultado = "peso normal.";
            }
            else if (res >= 25 && res < 30) {
                resultado = "peso superior al normal.";
            }
            else {
                resultado = "obesidad.";
            }
            break
        default:
            resultado = "no se ha podido calcular.";
    }

    fetch("./consejos.json")
        .then(response => response.json())
        .then(data => {

            switch (resultado) {
                case "peso inferior al normal.":
                    consejo = data.find(item => item.id === "inferior").consejo;
                    break;
                case "peso normal.":
                    consejo = data.find(item => item.id === "normal").consejo;
                    break;
                case "peso superior al normal.":
                    consejo = data.find(item => item.id === "superior").consejo;
                    break;
                case "obesidad.":
                    consejo = data.find(item => item.id === "obesidad").consejo;
                    break;
                default:
                    consejo = "No se pudo calcular un consejo";
            }
            Swal.fire({
                title: '¡Calculado!',
                text: "Tu IMC es de: " + res.toFixed(2) + ", y tu condición " + resultado,
                icon: 'question',
                confirmButtonText: 'Aceptar',
                iconColor: "dimgray",
                iconHtml: '<i class="bi bi-calculator"></i>'
            })

            guardarResultado(res, resultado, consejo);
            mostrarResultado();

            
            setTimeout(() => {
                main.innerHTML += "<li class='datos'>" + consejo +"</li>";
            }, 2000);
            
        })

        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
});




const botonColorMode = document.querySelector("#color");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
    botonColorMode.innerText = "Cambiar a Light Mode"
}

function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
    botonColorMode.innerText = "Cambiar a Dark Mode"
}

if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
})

