function create(tag, object, text){
    const props = object || {}
    const element = document.createElement(tag)
    if (props.id) element.id = id
    if (props.className) element.className = className
    if (text) element.innerText = text
    if (style) {
        
    }
    return element
}

let div = create('div', {style: {color: 'red', fontSize: '20px'}}, 'ghbdtn')


document.body.append(div)
