
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
        const div = document.createElement('article');
        div.innerHTML = `
        <a href="#"><img src="${character.image}" alt="Avatar van ${character.name}"></a>
        <h2>${character.name}</h2>
        <p>${character.status}</p>
        <p>${character.species}</p>
        <p>${character.gender}</p>
        <p>${character.location.name}</p>
        <p>Komt voor in ${character.episode.length} aflevering(en)</p>`;
        section.appendChild(div);
    });
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

fetchCharacters()