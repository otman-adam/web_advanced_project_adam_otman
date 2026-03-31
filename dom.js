
let characters = [];
let favorites = [];

async function fetchCharacters() {
    const response = await fetch("https://rickandmortyapi.com/api/character")
        .then(response => {
            console.log('Status:', response.status);
            console.log('Status text:', response.statusText);
            console.log('Headers', response.headers.get('Content-Type'));
            if (!response.ok) {
                throw new Error("Characters ophalen is niet gelukt.");
            }
            return response.json();
        })
        .then(data => console.log("Ontvangen data:", data))
        .catch(error => console.error("Fout bij het ophalen: ", error))    

    const data = await response.json();

    
}