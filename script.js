let selection = window.getSelection(),
getRange      = selection.getRangeAt(0),
selectionRect = getRange.getBoundingClientRect();

top = selectionRect.top;
left = selectionRect.left;

var popup = document.createElement("div"); 
document.documentElement.appendChild(popup);

popup.style.cssText = `
    position: absolute;
    width: 300px;
    height: 300px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: white;
    text-align: center;
    color: white;
    border-radius: 8px;
    z-index: 9999;

    transform: translateX(-50%);
`;

popup.style.top = (selectionRect.top + 30) + 'px';
popup.style.left = (selectionRect.left + (selectionRect.width * 0.5)) + 'px'


alert(selectionRect.top);
