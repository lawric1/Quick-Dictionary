
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
        example.innerText = '"' + meaning.definitions[0].example + '"';
        
        partOfSpeech.style.cssText = `
            margin-top: 16px;
            margin-bottom: 0px;
            font-size: smaller;
            font-style: italic;
            opacity: 0.8;
        `;
        definition.style.cssText = `
            margin-top: 16px;
            margin-left: 6px;
        `;
        example.style.cssText = `
            display: list-item;
            list-style-type: square;
            list-style-position: outside;
            margin-left: 24px;
            opacity: 0.7;
        `;

        block.appendChild(partOfSpeech);
        block.appendChild(definition);
        block.appendChild(example);
        
        div.appendChild(block);
    
    });

    return div
}

function createPopup(data) {
    var selection = window.getSelection();
    var selectionRect = selection.getRangeAt(0).getBoundingClientRect()

    var popup           = document.createElement("div");
    popup.style.cssText = `
        position: absolute;
        width: auto;
        padding: 16px;
        background: #342b49;
        color: white;
        border: solid;
        border-radius: 8px;
        z-index: 9999;

        transform: translateX(-50%);
    `;
    popup.style.top     = (selectionRect.top + window.scrollY + 40) + 'px';
    popup.style.left    = (selectionRect.left + (selectionRect.width * 0.5)) + 'px';

    var word           = document.createElement("h3");
    word.innerText     = selection.toString();
    word.style.cssText = `
        margin: 8px;
        font-weight: bold;
    `;

    meanings = getMeanings(data)

    popup.appendChild(word);
    popup.appendChild(meanings);
    document.documentElement.appendChild(popup);

    document.body.addEventListener('click', (e) => {
        popup.remove()
    }, false);
}

async function getData(word) {
    try {
        const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then(Response => {return Response.json()})
        createPopup(data)
    } catch(e) {console.log(e)}
}

function getDataHandler(event) {
    let word = window.getSelection().toString();
    getData(word);
}

document.body.addEventListener('dblclick', getDataHandler, true);

chrome.runtime.onMessage.addListener((message) => {
    if (message.status) {
        console.log(message.status)
        document.body.removeEventListener('dblclick', getDataHandler, true);
    }
});