const numCartasSelect = document.getElementById("numCartas");
const iniciarBtn = document.getElementById("iniciar");
const gameBoard = document.getElementById("gameBoard");
const controls = document.getElementById("controls");
const grupoBtns = document.querySelectorAll(".grupo-btn");

let baraja = [];
let lista1 = [];
let lista2 = [];
let lista3 = [];
let cartaElegida;
let posicionCartaElegida = 0;
let repeticiones = 0;
let cartasCorrectas = false;
let numeroCartas = 3;

function agregarCarta(numero) {
  console.log("agregando el numero: ", numero);
  baraja.push({ numero: numero });
}

function obtenerNumeroCartas(datos) {
  if (datos % 3 !== 0 || datos > 81) {
    cartasCorrectas = false;
    alert("Error: Ingrese un multiplo de tres entre 0 y 81");
  } else {
    numeroCartas = datos;
    if (numeroCartas === 3) repeticiones = 1;
    else if (3 < numeroCartas && numeroCartas <= 9) repeticiones = 2;
    else if (9 < numeroCartas && numeroCartas <= 27) repeticiones = 3;
    else if (27 < numeroCartas && numeroCartas <= 81) repeticiones = 4;
    posicionCartaElegida = Math.ceil((numeroCartas + 1) / 2) - 1;
    cartasCorrectas = true;
  }
}

function ordenarListas(numeroListaDeMedio) {
  if (numeroListaDeMedio == 1) {
    baraja.push(...lista2);
    baraja.push(...lista1);
    baraja.push(...lista3);
  }
  if (numeroListaDeMedio == 2) {
    baraja.push(...lista1);
    baraja.push(...lista2);
    baraja.push(...lista3);
  }
  if (numeroListaDeMedio == 3) {
    baraja.push(...lista1);
    baraja.push(...lista3);
    baraja.push(...lista2);
  }
  lista1 = [];
  lista2 = [];
  lista3 = [];
  cartaElegida = baraja[posicionCartaElegida];
}

function llenarGrupos() {
  let rep = Math.floor(baraja.length / 3);
  console.log("llenando grupos con floor", rep);
  for (let index = 0; index < rep; index++) {
    console.log("llenando grupos", index);
    lista1.push(baraja.shift());
    lista2.push(baraja.shift());
    lista3.push(baraja.shift());
  }
  console.log(lista1);
  console.log(lista2);
  console.log(lista3);
}

function elegirLista() {
  let listaElegida = prompt("En que grupo esta tu carta?");
  ordenarListas(listaElegida);
}

function imprimirGrupos() {
  console.log("Lista 1: ", ...lista1);
  console.log("Lista 2: ", ...lista2);
  console.log("Lista 3: ", ...lista3);
}

function iniciar(datosPantalla) {
  console.log("los datos ingresados para cartas es: ", datosPantalla);
  obtenerNumeroCartas(Number(datosPantalla));
  if (cartasCorrectas) {
    baraja = [];
    for (let index = 1; index < Number(numeroCartas) + 1; index++) {
      agregarCarta(index);
    }

    alert("Elige una carta mentalmente");
    llenarGrupos();
    for (let i = 0; i < repeticiones; i++) {
      imprimirGrupos();
      elegirLista();
      llenarGrupos();
    }
    console.log("Elegista la carta # ", cartaElegida.numero);
  } else {
    console.log("el numero de cartas es incorrecto");
  }
}

let datos = prompt("¿Con cuantas cartas quieres jugar?");
iniciar(datos);
// ordenarListas(2);
// console.log("baraja: ", baraja);
// console.log(lista1);
