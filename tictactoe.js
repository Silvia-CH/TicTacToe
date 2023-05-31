//-----------------VARIABLES-----------------

// secciones en el HTML
let casillas = document.getElementsByClassName("casilla");
let contadores = document.getElementsByClassName('contadores')[0];
let main = document.getElementsByTagName('main')[0];

// posiciones ganadoras
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// ficha y las posiciones de las fichas posicionadas
let ficha = 'X';
let cruces = [];
let circulos = [];

let longitud = 0;

let ganadorCruz = 0;
let ganadorCirculo = 0;

let posibleCombinacion = [];

// contadores
let contadorIgual = 0;
let contadorCruz = 0;
let contadorCirculo = 0;

let contadorFichas = 0;


//  esquema de turnos y puntos
let div = document.createElement('div');
div.setAttribute('class', 'contadores');

// puntuaje
let igual = document.createElement('h2');
let o = document.createElement('h2');
let x = document.createElement('h2');

igual.innerHTML = 'En tablas: ' + contadorIgual;
o.innerHTML = 'Circulos: ' + contadorCirculo;
x.innerHTML = 'Cruces: ' + contadorCruz;

// de quien es el turno
let turnos = document.createElement('h1');

turnos.innerHTML = 'ES TURNO DE: ' + ficha;

div.appendChild(turnos);
div.appendChild(igual);
div.appendChild(o);
div.appendChild(x);


main.appendChild(div);


// -----------------MÉTODOS-----------------

/**
 * @description esta función se activa con un click 
 *  y llama todos los métodos necesarios 
 * 
 * @param numero el id de la casilla presionada
 * 
 */
function agregarFicha(numero) {

    ganadorCruz = 0;
    ganadorCirculo = 0;
    contadorFichas++;

    // cambiar turno & introducir ficha
    cambioTurno(numero);

    // comprobar si existe una ficha ganadora
    comprobarFicha();

    // hacer que una casilla ya seleccionada no se pueda volver a seleccionar
    casillas[numero].removeAttribute('onclick');

    // en caso de que haya un ganador o se acabe el espacio en el tablero
    comprobarGanador();
}

/**
 * @description inserta la ficha y cambia el turno
 * 
 * @param numero el id de la casilla presionada
 */
function cambioTurno(numero){
    if (ficha === 'X') {
        casillas[numero].innerHTML = "X";
        cruces.push(numero);
        cruces.sort();
        longitud = cruces.length;

        ficha = 'O'; // cambia turno
        turnos.textContent = 'ES TURNO DE: ' + ficha;
    } else {
        casillas[numero].innerHTML = "O";
        circulos.push(numero);
        circulos.sort();
        longitud = circulos.length;

        ficha = 'X'; // cambia turno
        turnos.textContent = 'ES TURNO DE: ' + ficha;
    }
}


/** 
 * @description comprueba si las fichas ya introducidas forman 
 *  uno de los patrones de CombinacionesGanadoras
*/
function comprobarFicha() {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        for (let j = 0; j < longitud; j++) {
            // ¿existe una combinación ganadora en el tablero actual?
            if (combinacionesGanadoras[i].includes(cruces[j])) {
                ganadorCruz++; // si existe, añade un punto por ficha
                posibleCombinacion = cruces[j];
            } else if (combinacionesGanadoras[i].includes(circulos[j])) {
                ganadorCirculo++;
                posibleCombinacion = circulos[j];
            }
        }
        // si no existe, borra los puntos existentes
        if (ganadorCruz < 3) {
            ganadorCruz = 0;
            posibleCombinacion = [];
        }

        if (ganadorCirculo < 3) {
            ganadorCirculo = 0;
            posibleCombinacion = [];
        }
    }
}


/**
 * @description si la condición ganadora se cumple, 
 *  se actualiza el contador y se borra el tablero
 */
function comprobarGanador(){
    if (ganadorCruz >= 3) {
        contadorCruz++;
        x.textContent = 'Cruces: ' + contadorCruz;
        setTimeout(borrarTodo, 500);
    } else if (ganadorCirculo >= 3) {
        contadorCirculo++;
        o.textContent = 'Circulos: ' + contadorCirculo;
        setTimeout(borrarTodo, 500);
    } else if (contadorFichas == 9) {
        contadorIgual++;
        igual.textContent = 'En tablas: ' + contadorIgual;
        setTimeout(borrarTodo, 500);
    }
}

/** 
 * @description borra todas las fichas e info de la partida anterior 
 *  y empieza un juego nuevo (sin eliminar la info de los contadores)
 * 
*/
function borrarTodo() {
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].innerHTML = "";
        casillas[i].removeAttribute('onclick');
        casillas[i].setAttribute('onclick', 'agregarFicha(' + i + ')');
    }
    ganadorCruz = 0;
    ganadorCirculo = 0;
    contadorFichas = 0;

    cruces = [];
    circulos = [];
    ficha = 'X';
    turnos.textContent = 'ES TURNO DE: ' + ficha;
}