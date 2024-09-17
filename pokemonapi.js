async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
        throw new Error(`Pokemon not found: ${name}`);
    }
    return response.json();
}

async function fetchMultiplePokemon() {
    const names = document.getElementById('pokemonNames').value.split(',').map(name => name.trim());
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = ''; // Clear previous results

    for (const name of names) {
        try {
            const data = await fetchPokemon(name);
            const card = document.createElement('div');
            card.className = 'pokemon-card';

            const img = document.createElement('img');
            img.src = data.sprites.front_default;
            img.alt = name;

            const nameTag = document.createElement('p');
            nameTag.textContent = name.charAt(0).toUpperCase() + name.slice(1);

            card.appendChild(img);
            card.appendChild(nameTag);
            container.appendChild(card);
        } catch (error) {
            console.error(error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `Error fetching ${name}: ${error.message}`;
            errorMsg.style.color = 'red';
            container.appendChild(errorMsg);
        }
    }
}

function resetPokemon() {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = ''; // Clear all fetched Pokémon
}