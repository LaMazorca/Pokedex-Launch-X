const pokeViewJs = document.querySelector('[data-Poke-View]');
const pokeNameJs = document.querySelector('[data-Poke-Name]');
const pokeImgBoxJs = document.querySelector('[data-Poke-Img-Box]');
const pokeImgJs = document.querySelector('[data-Poke-Img]');
const pokeNumberJs = document.querySelector('[data-Poke-Number]');
const pokeAbilityJs = document.querySelector('[data-poke-Ability]')
const pokeTypesJs = document.querySelector('[data-Poke-Types]');
const pokeStatsJs = document.querySelector('[data-Poke-Stats]');

const typeColors = {
    electric: '#ffea70',
    normal: '#b09398',
    fire:  '#ff675c',
    water: '#0596c7',
    ice: '#afeafd',
    rock: '#999799',
    flying: '#7ae7c7',
    grass: '#4a9681',
    psychic: '#ffc6d9',
    ghost: '#561d25',
    bug: '#a2faa3',
    poison: '#795663',
    ground: '#d2b074',
    dragon: '#da627d',
    steel: '#1d8a99',
    fighting: '#2f2f2f',
    default: '#2a1a1f'
}

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(error => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;
    const ability = data.abilities;

    pokeNameJs.textContent = data.name;
    pokeImgJs.setAttribute('src', sprite);
    pokeNumberJs.textContent = `N° ${data.id}`;
    setViewColor(types);
    renderPokemonTypes(types);
    renderPokemonAbility(ability);
    renderPokemonStats(stats);
}

const setViewColor = types => {
    const colorOne = typeColors [types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default; 
    pokeImgJs.style.background = `linear-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImgJs.style.backgroundSize = ' .5rem .5rem';
}

const renderPokemonTypes = types => {
    pokeTypesJs.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypesJs.appendChild(typeTextElement);
    });
}

const renderPokemonAbility = abilities => {
    pokeAbilityJs.innerHTML = '';
    abilities.forEach(ability => {
        const typeTextAbility = document.createElement("div");
        typeTextAbility.textContent = ability.ability.name;
        pokeAbilityJs.appendChild(typeTextAbility);
    });
}

const renderPokemonStats = stats => {
    pokeStatsJs.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementBase = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementBase.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementBase);
        pokeStatsJs.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeNameJs.textContent = 'Pokemon aún no descubierto';
    pokeImgJs.style.background = '#fff';
    pokeImgJs.setAttribute('src', '../Pokedex/img/siluetaPokemon.png');
    pokeTypesJs.innerHTML = '';
    pokeAbilityJs.innerHTML = '';
    pokeStatsJs.innerHTML = '';
    pokeNumberJs.textContent = '';
}
