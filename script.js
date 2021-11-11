let selection = window.getSelection(),
getRange      = selection.getRangeAt(0),
selectionRect = getRange.getBoundingClientRect();

top = selectionRect.top;
left = selectionRect.left;

function createPopup() {
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

    var word = document.createElement("h2");
    word.innerText = selection.toString();
    word.style.margin = '8px';
    popup.appendChild(word);

    for(let i = 0; i < 10; i++) {
        var p = document.createElement("p");
        p.innerText = 'test';
        popup.appendChild(p);
    }


    document.documentElement.appendChild(popup);
}


createPopup();


alert(selectionRect.top);
