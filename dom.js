
let characters = [];
let favorites = [];

async function fetchCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(data => {
        characters = data.results;
        console.log(characters);
        renderCharacters(characters);
      })
      .catch(error => {
        console.error("Er ging iets mis ", error);
      })
}

const renderCharacters = (characters) => {
    const section = document.getElementById('my-section');
    section.innerHTML = '';

    characters.forEach(character => {
        const article = document.createElement('article');
        const isFavorite = favorites.some(fav => fav.id === character.id);

        article.innerHTML = `
        <a href="#"><img src="${character.image}" alt="Avatar van ${character.name}"></a>
        <h2>${character.name}</h2>
        <p>${character.status}</p>
        <p>${character.species}</p>
        <p>${character.gender}</p>
        <p>${character.location.name}</p>
        <p>Komt voor in ${character.episode.length} aflevering(en)</p>
        <button class="favoritebutton ${isFavorite? "active": ""}" data-id="${character.id}"> ${isFavorite ? "Favorite" : "Not favorite"}</button>`;
        section.appendChild(article);
    });

    document.querySelectorAll('.favoritebutton').forEach(button => {
    button.addEventListener('click', event => {
        const id = parseInt(event.currentTarget.dataset.id);
        const character = characters.find(c => c.id === id);
        const isAlreadyFavorite = favorites.some(fav => fav.id === id);

        if (isAlreadyFavorite) {
            favorites = favorites.filter(fav => fav.id !== id);
        } else {
            favorites.push(character)
        }
        renderCharacters(characters)
    })
})
}
document.getElementById("zoekbalk").addEventListener('input', (event)=> {
    const zoekterm = document.getElementById("zoekbalk").value.toLowerCase();
    const gefilterd = characters.filter(character => {
        return character.name.toLowerCase().includes(zoekterm) ||
        character.status.toLowerCase().includes(zoekterm) ||
        character.species.toLowerCase().includes(zoekterm) ||
        character.gender.toLowerCase().includes(zoekterm) ||
        character.location.name.toLowerCase().includes(zoekterm) 
    })
    renderCharacters(gefilterd)
})

document.getElementById("status").addEventListener('change', (event) => {
    const value = event.target.value.toLowerCase();
    const gefilterd = characters.filter(character => {
        return character.status.toLowerCase().includes(value)
    })
    if (value == "alle status") { 
        renderCharacters(characters) 
    }
    else {
        renderCharacters(gefilterd)
    }
})

document.getElementById("sortAZ").addEventListener('change', (event) => {
    const value = event.target.value.toLowerCase();
    let gefilterd = [];
    if (value == "naam a-z") {
        gefilterd = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    } else if (value == "naam z-a") {
        gefilterd = [...characters].sort((a, b) => b.name.localeCompare(a.name));
    } else {
        gefilterd = [...characters];
    }
    renderCharacters(gefilterd)
})

document.getElementById("afkomst").addEventListener('change', (event) => {
    const value = event.target.value.toLowerCase();
    let gefilterd = [];
    if (value == "alle") {
        gefilterd = characters;
    } else {
        gefilterd = characters.filter(character => {
            return character.location.name.toLowerCase().includes(value)
        })
    }
    renderCharacters(gefilterd);
})

document.getElementById("showfavorite").addEventListener('change', (event) => {
    const value = event.target.checked;
    if (value) {
        renderCharacters(favorites);
    } else {
        renderCharacters(characters);
    }
})

fetchCharacters()