const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("loadMore");

const limit = 5;
let offset = 0;

function loadPokemonItems(offset, limit) {
	pokeApi
		.getPokemons(offset, limit)
		.then((pokemons = []) => {
			const newHtml = pokemons
				.map(
					(pokemon) => `
	
	<div class="text-white font-bold w-96 p-8  rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all ${
		pokemon.element
	}">
				<div class="flex flex-col">
					<div class="pr-4 ml-auto">ID: ${pokemon.pokemonID}</div>
					<div class="pl-4 mb-4 mr-auto capitalize">${pokemon.name}</div>
					<div class="flex justify-between">
						<div class="space-y-4">
						${pokemon.types
							.map(
								(type) =>
									`<div class="shadow-md brightness-110 px-4 py-1 rounded-full ${pokemon.element}">${type}</div>`
							)
							.join("")}
							
						</div>
						<div>
							<img
								class="w-full h-28"
								src="${pokemon.img}"
								alt="${pokemon.name}"
							/>
						</div>
					</div>
				</div>
				<div class="w-full mt-8 text-gray-800 rounded-md shadow-md bg-white/90">
					<div class="flex flex-col p-8 space-y-2">
						<div>
							<h3 class="font-medium text-xl tracking-wider">Detail</h3>
						</div>
						<div class="flex">
							<div>Hp</div>
							<div class="ml-2">${pokemon.hp}</div>
						</div>
						<div class="flex">
							<div>Attack</div>
							<div class="ml-2">${pokemon.attack}</div>
						</div>
						<div class="flex">
							<div>Defense</div>
							<div class="ml-2">${pokemon.defense}</div>
						</div>
						<div class="flex">
							<div>Special Attack</div>
							<div class="ml-2">${pokemon.specialAttack}</div>
						</div>
						<div class="flex">
							<div>Special Defense</div>
							<div class="ml-2">${pokemon.specialDefense}</div>
						</div>
						<div class="flex">
							<div>Speed</div>
							<div class="ml-2">${pokemon.speed}</div>
						</div>
					</div>
				</div>
			</div>`
				)
				.join("");
			pokemonList.innerHTML += newHtml;
		})
		.catch((error) => console.log(error));
}

loadPokemonItems(offset, limit);

loadMore.addEventListener("click", () => {
	offset += limit;
	loadPokemonItems(offset, limit);
});
