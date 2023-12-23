const API_URL = "https://api.tfl.gov.uk/Line/{ids}/Status";
const root = document.getElementById("root");
const form = document.getElementById("lineStatusForm");
form.addEventListener("submit", (event) => {
  // Prevents the form from submitting and refreshing the page
  event.preventDefault();
  const lineId = document.getElementById("ids").value;
fetch(`${API_URL.replace("{ids}", lineId)}`)
    .then((response) => response.json())
    .then((lineId) => {
      // create elements for the Pokemon Card
      //const div = document.createElement("div");
      //const image = document.createElement("img");
      //const name = document.createElement("h1");
      //div.className = "card";
     // image.src = newPokemon.sprites.front_default; // Use the available property;
     // name.textContent = newPokemon.name;
      //div.appendChild(name);
     // div.appendChild(image);
     // root.appendChild(div);

      // another image option:
      //image.src = newPokemon.sprites.front_default;
      // other ideas:
      // div.appendChild(pokemonNameLabel);
      // div.appendChild(pokemonAttack);
      // div.appendChild(pokemonHealth);
  });
});
