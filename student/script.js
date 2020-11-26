window.onload = function(){
function Creater(root){
    this.root = root
    this.elements = {}
    Creater.prototype.add = function(tag, object, ...children){
        const {id, className, style,  data, attrs, events, ref,  ...props} = object
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
         if (ref) this.elements[ref] = element
         
        if (children) element.append(...children)
        return element
    }
    Creater.prototype.publish = function(...elements){
        this.root.append(...elements)
    }
}



window.creator = new Creater(document.getElementById('root'))

creator.publish(
    creator.add('div', {className: 'input-group mt-1 mb-3'}, 
        creator.add('input', {
            className: 'form-control', 
            ref: 'input', 
            type: 'text', 
            placeholder: 'Введите описание задачи',
            events: {
                'keyup': function(event) {
                    if (event.code === 'Enter'){
                        creator.elements['container'].append(
                            creator.add('p', {}, this.value)
                            )
                        this.value = ''
                    }
                    if (event.code === "Escape"){
                        this.value = ''
                    }
                    let test  = () => console.log(this)
                    test()
                }
            }
        }),
        creator.add('div', {className: 'input-group-append'},  
            creator.add('button', { 
                className:'btn btn-outline-secondary',
                type: 'button',
                events: {
                    'click': ()=>{
                        creator.elements['container'].append(
                            creator.add('p', {}, creator.elements['input'].value)
                            )
                        creator.elements['input'].value = ''
                    }
                }
            }, '+ Создать')
        ),
    ),
    creator.add('div', {ref: 'container'})
    )

}

// hghg
