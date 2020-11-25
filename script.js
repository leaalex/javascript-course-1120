window.onload = function(){
function create(tag, object, ...children){
    const {id, className, style,  data, attrs, events, ...props} = object
    const element = document.createElement(tag)
    if (id) element.id = id
    if (className) element.className = className
    if (style) {
        Object.keys(style).forEach(key => {
            element.style[key] = style[key]
        })
    }
    if (data) {
        Object.keys(data).forEach(key => {
            element.dataset[key] = data[key]
        })
    }
    if (props) {
        Object.keys(props).forEach(key => {
            element[key] = props[key]
        })
    }
    if (attrs){
        Object.keys(attrs).forEach(key => {
            element.addEventListener(key , attrs[key])
        })
     }
     if (events){
        Object.keys(events).forEach(key => {
            element.addEventListener(key , events[key])
        })
     }
     
    if (children) element.append(...children)
    return element
}



// function create(tag, object, text, ...children) {
//     const props = object || {}
//     const element = document.createElement(tag)
//     if (props.id) element.id = id
//     if (props.className) element.className = props.className
//     if (props.style) {
//     Object.keys(props.style).forEach(key => {
//     element.style[key] = props.style[key]
//     })
//     }
//     if (props.data) {
//     Object.keys(props.data).forEach(key => {
//     element.dataset[key] = props.data[key]
//     })
//     }
//     if (props.href) element.href = props.href
//     if (props.src) element.src = props.src
//     if (text) element.innerText = text
//     if (children) element.append(...children)
//     return element
//     }
    
    // let card =
    // create("div", { className: "card", style: { width: "18rem" } }, 
    // create("img", {
    // src: "https://cdn.icon-icons.com/icons2/1812/PNG/512/4213460-account-avatar-head-person-profile-user_115386.png",
    // className: "card-img-top"
    // }),
    // create("div", { className: "card-body" }, 
    // create("h5", { className: "card-title" }, "Иван Иванович"),
    // create("p", { className: "card-text" }, "Профессия: Программист"),
    // create("p", { className: "card-text" }, "Стаж: 10 лет"),
    // create("p", { className: "card-text" }, "Возраст: 30 лет"),
    // create("a", { className: "btn btn-primary", href: "http://google.com" }, "Кнопка")
    // )
    // )



    // document.body.append(card)



    let input = create('input', {type: 'text'})

    document.body.append(
        create('div', {}, 
            input,
            create('button', { 
                events: {
                    'click': ()=>{console.log(input.value)
                    }
                }
            }, 'Нажми на меня')
            )
        )

}