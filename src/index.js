const url = "http://localhost:3000/characters"
function creatCharacterBar(url){
    fetch(url)
    .then(res => res.json())
    .then(data => addCharacter(data))
}

function addCharacter(data) {
    const bar = document.querySelector('#character-bar')
    data.forEach(character => {
        const characterNameInBar = document.createElement('span')
        characterNameInBar.textContent = character.name
        characterNameInBar.onclick = () => {
            document.querySelector("#name").textContent = character.name
            document.querySelector("#image").src = character.image
            document.querySelector("#image").alt = character.name
            document.querySelector("#vote-count").textContent = character.votes
        }
        bar.append(characterNameInBar)
    })
}

document.querySelector("#votes-form").addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault();
    let totalVotes = document.querySelector('#vote-count').textContent
    parseTot = parseInt(totalVotes)
    parseTarg = parseInt(e.target.votes.value)
    totalVotes = parseTot + parseTarg
    document.querySelector('#vote-count').textContent = totalVotes

}

document.querySelector("#character-form").addEventListener('submit', handleNewCharacter)

function handleNewCharacter(e) {
    e.preventDefault();
    let newCharacter = {
        name: e.target.name.value,
        image: e.target['image-url'].value,
        votes: 0
    }
    addNewCharacter(newCharacter)
}

function addNewCharacter(characterObj) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterObj)
    })

}

document.querySelector('#reset-btn').onclick = () => {
    document.querySelector('#vote-count').textContent = 0
}

creatCharacterBar(url)
