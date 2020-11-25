function create(tag, object, children){
    const props = object || {}
    const element = document.createElement(tag)
    if (props.id) element.id = id
    if (props.className) element.className = className
    if (props.style) {
        Object.keys(props.style).forEach(key => {
            element.style[key] = props.style[key]
        })
    }
    if (props.data) {
        Object.keys(props.data).forEach(key => {
            element.dataset[key] = props.data[key]
        })
    }
    if (children) element.innerText = text
    return element
}

let div = create('div', {style: {color: 'red', fontSize: '20px'}}, 'ghbdtn')


document.body.append(div)
