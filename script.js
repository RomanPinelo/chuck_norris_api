console.log("Soy el archivo app.js");
var nextBut = document.getElementById("container-nextButton");

//Termina de cargar el contenido y hace lo que le indiquemos en el código
document.addEventListener("DOMContentLoaded", () => {
  //Llamo a fetchData para mostar la información en la consola
  fetchData();
});

//Es async porque necesitamos que se espere a que nos traiga la información y la pinte
//fetch recibe una url.
//https://pokeapi.co/api/v2/pokemon/150  -> url de la api con la información del pokemon 150
//Pero usando `https://pokeapi.co/api/v2/pokemon/${id}`, ya se genera una url con un número aleatorio
const fetchData = async () => {
  try {
    //Con async y   Aawait le decimos que se espere a que tenga una solictud, cuando tengas esa información, pasa a la siguiente linea.
    const res = await fetch(`https://api.chucknorris.io/jokes/random`);
    console.log(res);

    //Aquí la información viene en bruto, por lo tanto se convierte a json
    const data = await res.json();
    console.log(data);

    //Ya que tengo los datos mando a llamar a la funcion y muestro los datos
    pintarInfo(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarInfo = (data) => {
  const container = document.querySelector(".container"); //Es donde empujo el fragment creado con la información
  const template = document.querySelector("#template-info").content; //Quiero acceder a la información del template
  const clone = template.cloneNode(true); //Nos ayuda a clonar el template original y usarlo en loops para renderizar varios elementos
  const fragment = document.createDocumentFragment();//Es algo invisible que se genera en JavaScript, por lo que no interferimos con nuestro HTML

  clone.querySelector(".container-image").setAttribute("src", data.icon_url); //Uso querySelector porque solo hay una clase
  //textContent pone texto plano, es decir que si pongo <span></span> no lo interpreta como HTML
  //y lo pone tal cual
  clone.querySelector(".container-phrase").textContent = data.value;

  fragment.appendChild(clone); //En el fragment guarda el código de clone con el atributo src modificado

  container.appendChild(fragment);  //Inyecto en el main con clase flex la información
};


nextBut.addEventListener('click', () => {
  location.reload();
});