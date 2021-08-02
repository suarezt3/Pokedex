// API POKEMON
const pokeContainer = document.getElementById('poke-container')
const pokemonsNumber = 12
const typeColors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#f3f367',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

// PIDE LA CANTIDAD DE POKEMONS QUE NECESITEMOS
const fetchPokemon = async () => {
	for (let i = 1; i <= pokemonsNumber; i++){
		await getPokemon(i)
	}
}
// SOLICITA LOS DATOS A LA API
const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const respuesta = await fetch(url)
	const pokemon = await respuesta.json()

	createPokemonCard(pokemon)
}

// CREA CADA TARJETA PARA MOSTRAR
function createPokemonCard(pokemon) {
	const cardPokemon = document.createElement('div')
	cardPokemon.classList.add('pokemon')
	const name = pokemon.name
	const id = pokemon.id
	const imageSource = pokemon.sprites.other.dream_world.front_default
	const type = pokemon.types[0].type.name
	const [hp, attack, defense] = [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat]
	const color = typeColors[type] // Para poder pasar valores con variables

	// ESTRUCTURA HTML DE CADA TARJETA
	const pokemonInnerData = `
	<div class="img-container">
		<img src="${imageSource}">
	</div>

	<div class='info'>
		<span class='id'>#${id.toString().padStart(3,'0')}</span>
		<h2 class='name'>${name}</h2>
		<p class='type'>Type: <span>${type}</span></p>
	</div>

	<div class='stat'>
		<h3>Basic Stats</h3>
		<p>HP: ${hp}</p>
		<p>ATTACK: ${attack}</p>
		<p>DEFENSE: ${defense}</p>
	</div>
	`

	cardPokemon.style.background = color // COLOCAR EL COLOR DE FONDO DE LA TARJETA
	cardPokemon.innerHTML = pokemonInnerData // ASIGNAMOS EL HTML A NUESTRA DIV DE TARJETA
	pokeContainer.appendChild(cardPokemon) // AÑADIMOS NUESTRO DIV AL HTML
}

fetchPokemon()