const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
	const pokemon = new Pokemon();
	pokemon.name = pokeDetail.name;
	pokemon.pokemonID = pokeDetail.order;

	const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.types = types;
	pokemon.element = type;

	pokemon.img = pokeDetail.sprites.other.dream_world.front_default;

	const stats = pokeDetail.stats.map((statSlot) => statSlot);

	const [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

	pokemon.hp = hp.base_stat;
	pokemon.attack = attack.base_stat;
	pokemon.defense = defense.base_stat;
	pokemon.specialAttack = specialAttack.base_stat;
	pokemon.specialDefense = specialDefense.base_stat;
	pokemon.speed = speed.base_stat;

	return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
		.then((detailRequests) => Promise.all(detailRequests))
		.then((pokemonDetails) => pokemonDetails);
};
