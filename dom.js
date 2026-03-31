
let characters = [];
let favorites = [];

async function fetchCharacters() {
    // const response = await fetch("https://rickandmortyapi.com/api/character");
    // const data = await response.json();
    // characters = data.results;
    // console.log(characters)
    // renderCharacters(characters)

    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(data => {
        const characters = data.results;
        console.log(characters);
        renderCharacters(characters);
      })
      .catch(error => {
        console.error("Er ging iets mis ", error);
      })
}

const renderCharacters = (characters) => {
    const section = document.getElementById('my-section');

    characters.forEach(character => {
        const div = document.createElement('article');
        div.innerHTML = `
        <p>${character.name}</p>
        <p>${character.status}</p>
        <p>${character.species}</p>
        <p>${character.gender}</p>
        <p>${character.location.name}</p>
        <p>${character.episode.length} aflevering</p>`;
        section.appendChild(div);
    });
}

fetchCharacters()