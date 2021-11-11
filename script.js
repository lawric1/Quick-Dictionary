
function getMeanings(data) {
    meanings = data[0].meanings
    var div = document.createElement("div");

    meanings.forEach(meaning => {
        var block = document.createElement("div");

        var partOfSpeech = document.createElement("p");
        var definition = document.createElement("p");
        var example = document.createElement("p");

        partOfSpeech.innerText = meaning.partOfSpeech;
        definition.innerText = meaning.definitions[0].definition;
        example.innerText = meaning.definitions[0].example;
        
        block.appendChild(partOfSpeech);
        block.appendChild(definition);
        block.appendChild(example);
        
        div.appendChild(block);
    
    });

    return div
}

function createPopup(data, selection) {
    
    getRange      = selection.getRangeAt(0),
    selectionRect = getRange.getBoundingClientRect();

    top = selectionRect.top;
    left = selectionRect.left;

    var popup = document.createElement("div");
    popup.style.cssText = `
    position: absolute;
    width: auto;
    padding: 16px;
    background: lightblue;
    color: white;
    border-radius: 8px;
    z-index: 9999;

    transform: translateX(-50%);
    `;
    popup.style.top = (selectionRect.top + 80) + 'px';
    popup.style.left = (selectionRect.left + (selectionRect.width * 0.5)) + 'px';

    var word = document.createElement("h3");
    word.innerText = selection.toString();
    word.style.margin = '8px';
    popup.appendChild(word);

    meanings = getMeanings(data)
    popup.appendChild(meanings);
    document.documentElement.appendChild(popup);

    document.body.addEventListener('click', (e) => {
        popup.remove()
    }, false);
}

// function removePopup(popup) {
//     popup.remove()
//     document.body.removeEventListener('click', removePopup)
// }
async function getData(selection) {
    try {
        const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + selection.toString()).then(Response => {return Response.json()})
        createPopup(data, selection)
    } catch(e) {console.log(e)}
}

window.addEventListener('dblclick', e => {
    let selection = document.getSelection();
    console.log(selection.toString())
    getData(selection);
    
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.status) {
        alert(message.status);
    }
});