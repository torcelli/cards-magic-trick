const numCartasSelect = document.getElementById("numCartas");
const btnIniciar = document.getElementById("iniciar");
const divGameBoard = document.getElementById("gameBoard");
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
  // console.log("agregando el numero: ", numero);
  baraja.push({ numero: numero });
}

function obtenerNumeroCartas(datos) {
  if (datos % 3 !== 0 || datos > 81) {
    cartasCorrectas = false;
    alert("Error: Ingrese un multiplo de tres entre 0 y 81");
  } else {
    numeroCartas = Number(datos);
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
  console.log(...baraja);
  console.log("posición: ", posicionCartaElegida);
  console.log("carta elegida actual: ", cartaElegida);
}

function llenarGrupos() {
  let rep = Math.floor(baraja.length / 3);
  for (let index = 0; index < rep; index++) {
    console.log("llenando grupos", index);
    lista1.push(baraja.shift());
    lista2.push(baraja.shift());
    lista3.push(baraja.shift());
  }
  console.log(...lista1);
  console.log(...lista2);
  console.log(...lista3);
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

async function iniciar(datosPantalla) {
  console.log("los datos ingresados para cartas es: ", datosPantalla);
  obtenerNumeroCartas(Number(datosPantalla));
  if (cartasCorrectas) {
    baraja = [];
    for (let index = 1; index < Number(numeroCartas) + 1; index++) {
      agregarCarta(index);
      //console.log("agregando la carta en iniciar: ", index);
    }
    let cartasMostradas = await mostrarCartas();
    console.log("cartasMostradas: ", cartasMostradas);
    //esperar que se terminen de mostrar las cartas para que el usuario pueda elegir una
    if (cartasMostradas) await makeIterations();
  } else {
    console.log("el numero de cartas es incorrecto");
  }
}

// let datos = prompt("¿Con cuantas cartas quieres jugar?");
// iniciar(datos);
// ordenarListas(2);
// console.log("baraja: ", baraja);
// console.log(lista1);

async function makeIterations() {
  alert("Elige una carta mentalmente");
  llenarGrupos();
  for (let i = 0; i < repeticiones; i++) {
    console.log("baraja: ", baraja);
    imprimirGrupos();
    elegirLista();
    llenarGrupos();
  }
  console.log("Elegiste la carta # ", cartaElegida.numero);
}

function mostrarCartas() {
  return new Promise((resolve) => {
    divGameBoard.innerHTML = "";
    let cartasMostradas = 0;

    const divLista1 = document.createElement("div");
    divLista1.classList.add("list1");
    divGameBoard.appendChild(divLista1);

    const divLista2 = document.createElement("div");
    divLista2.classList.add("list2");
    divGameBoard.appendChild(divLista2);

    const divLista3 = document.createElement("div");
    divLista3.classList.add("list3");
    divGameBoard.appendChild(divLista3);

    baraja.forEach((carta, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.textContent = carta.numero;
      //cada vez que este en un tercio de la baraja, agregar las cargas a una lista diferente
      if (index % 3 === 0) {
        divLista1.appendChild(cardDiv);
      } else if (index % 3 === 1) {
        divLista2.appendChild(cardDiv);
      } else {
        divLista3.appendChild(cardDiv);
      }

      setTimeout(() => {
        const audio = new Audio("./flipcard.mp3");
        audio.play();
        audio.volume = 0.3;

        cardDiv.classList.add("show");
        cardDiv.addEventListener(
          "transitionend",
          () => {
            cartasMostradas++;
            if (cartasMostradas === baraja.length) {
              resolve();
            }
          },
          { once: true }
        );
      }, 100 * index);
    });
  });
}

function mostrarGrupos() {
  divGameBoard.innerHTML = "";
  //   baraja.push(...lista1);
  //   baraja.push(...lista2);
  //   baraja.push(...lista3);
  console.log("lista1: ", ...lista1);
  console.log("lista2: ", ...lista2);
  console.log("lista3: ", ...lista3);

  const divLista1 = document.createElement("div");
  divLista1.classList.add("list1");
  divGameBoard.appendChild(divLista1);

  lista1.forEach((carta, cartaIndex) => {
    console.log("carta index: ", carta.numero);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = carta.numero;
    divLista1.appendChild(cardDiv);
    setTimeout(() => {
      cardDiv.classList.add("show");
      const audio = new Audio("./flipcard.mp3");
      audio.play();
      audio.volume = 0.3;
    }, 100 * cartaIndex);
  });

  const divLista2 = document.createElement("div");
  divLista2.classList.add("list2");
  divGameBoard.appendChild(divLista2);

  lista2.forEach((carta, cartaIndex) => {
    console.log("carta index: ", carta.numero);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = carta.numero;
    divLista2.appendChild(cardDiv);
    setTimeout(() => {
      cardDiv.classList.add("show");
    }, 100 * cartaIndex);
  });

  const divLista3 = document.createElement("div");
  divLista3.classList.add("list3");
  divGameBoard.appendChild(divLista3);

  lista3.forEach((carta, cartaIndex) => {
    console.log("carta index: ", carta.numero);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = carta.numero;
    divLista3.appendChild(cardDiv);
    setTimeout(() => {
      cardDiv.classList.add("show");
    }, 100 * cartaIndex);
  });
}

function esperarSeleccionGrupo() {
  return new Promise((resolve) => {
    grupoBtns.forEach((btn, index) => {
      btn.addEventListener(
        "click",
        () => {
          grupoSeleccionado = index + 1;
          console.log("grupo seleccionado: ", grupoSeleccionado);
          resolve();
        },
        { once: true }
      );
    });
  });
}

btnIniciar.addEventListener("click", async () => {
  //limpiar el juego
  divGameBoard.innerHTML = "";
  document.getElementById("success-message-board").innerHTML = "";

  baraja = [];
  lista1 = [];
  lista2 = [];
  lista3 = [];
  cartaElegida = {};
  posicionCartaElegida = 0;
  repeticiones = 0;
  cartasCorrectas = false;
  numeroCartas = 3;

  obtenerNumeroCartas(numCartasSelect.value);
  console.log("numero de cartas: ", cartasCorrectas);
  if (cartasCorrectas) {
    baraja = [];
    for (let i = 1; i <= numeroCartas; i++) {
      baraja.push({ numero: i });
      //console.log("agregando la carta: ", i);
    }

    await mostrarCartas();
    alert("Elige una carta mentalmente");
    llenarGrupos();
    //mostrarGrupos();
    controls.style.display = "block";

    while (repeticiones > 0) {
      await esperarSeleccionGrupo();
      ordenarListas(grupoSeleccionado);
      //await mostrarCartas();
      llenarGrupos();
      repeticiones--;
      if (repeticiones > 0) {
        mostrarGrupos();
      } else {
        //alert(`Elegiste la carta número: ${cartaElegida.numero}`);
        controls.style.display = "none";
        //obtener el segundo child de divgameboard
        //limpiar el divgameboard
        divGameBoard.innerHTML = "";
        let successBoard = document.querySelector("#success-message-board");
        successBoard.display = "flex";
        successBoard.innerHTML = `<h2>✨ Tu carta es esta! ✨</h2><div class="card-adivinated">${cartaElegida.numero}</div>`;
        setTimeout(() => {
          const audio = new Audio("./magic.mp3");
          audio.play();
          audio.volume = 0.5;
          successBoard.innerHTML = `<h2>✨ Tu carta es ¡esta! ✨</h2><div class="card-adivinated show">${cartaElegida.numero}</div>`;
        }, 100);
      }
    }
  }
});
