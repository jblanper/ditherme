export function html (tag, attributes = null, children = null) {
    const elem = document.createElement(tag);

    if (attributes) addAttributes(elem, attributes); 
    if (children) addChildren(elem, children);

    return elem;
}

export function svg (tag, attributes = null, children = null) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);

    if (attributes) addAttributes(elem, attributes); 
    if (children) addChildren(elem, children);

    return elem;
}

function addAttributes (elem, attributes) {
    Object.keys(attributes).forEach(key => {
        switch (key) {
            case 'classes':
                attributes[key].forEach(cls => elem.classList.add(cls));
                break;
            case 'textContent':
                elem.textContent = attributes[key];
                break;
            case 'selected':
                elem.selected = attributes[key];
            default:
                elem.setAttribute(key, attributes[key]);
        }
    });
}

function addChildren (elem, children) {
    children.forEach(child => elem.appendChild(child));
}
