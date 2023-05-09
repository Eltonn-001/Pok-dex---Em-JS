const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImagem = document.querySelector(".pokemon__imagem");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const ButtonAnte = document.querySelector(".button.btn-prev");
const ButtonProx = document.querySelector(".button.btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImagem.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;

  } else {
    pokemonImagem.style.display = "none";
    pokemonName.innerHTML = "Não encontrado :c";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

ButtonAnte.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

ButtonProx.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
