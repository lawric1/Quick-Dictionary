let selection = window.getSelection(),
getRange      = selection.getRangeAt(0),
selectionRect = getRange.getBoundingClientRect();

top = selectionRect.top;
left = selectionRect.left;

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

function createPopup(data) {
    var popup = document.createElement("div");
    popup.style.cssText = `
    position: absolute;
    width: 300px;
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
}

function getData(word) {
    var data;
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(Response => {return Response.json()})
        .then(result  => {
            data = result;
            createPopup(data);
        })
}

getData(selection.toString());