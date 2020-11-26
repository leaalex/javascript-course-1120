window.onload = function(){
function Creater(root){
    this.root = root
    this.elements = {}
    Creater.prototype.genID = function(ref = 'ref'){
        return ref + '_' + Math.random().toString(36).substring(2,9)
    }
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

const input = creator.genID('input')


creator.publish(
    creator.add('div', {className: 'input-group mt-1 mb-3'}, 
        creator.add('input', {
            className: 'form-control', 
            ref: input, 
            type: 'text', 
            placeholder: 'Введите описание задачи',
            events: {
                'keyup': function(event) {

                    if (this.value !== '' && event.code === 'Enter'){
                        creator.elements['container'].append(createTask(creator.elements[input].value))
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
                        creator.elements['container'].append(createTask(creator.elements[input].value))
                        creator.elements['input'].value = ''
                    }
                }
            }, '+ Создать')
        ),
    ),
    creator.add('div', {ref: 'container'})
    )



function createTask(value){
    const input = creator.genID('input')
    return creator.add('div', {className:'input-group mb-3'},
                creator.add('div', {className:'input-group-prepend'},
                    creator.add('div', {className:'input-group-text'},
                        creator.add('input', {type:'checkbox'})
                    )
                ),
                creator.add('input', {className:'form-control', type:'text', disabled: true, ref: input,  value}),
                creator.add('div', {className: 'input-group-append'},  
                creator.add('button', { 
                    className:'btn btn-outline-secondary',
                    type: 'button',
                    events: {
                        'click': ()=>{
                            if (creator.elements[input].disabled) creator.elements[input].disabled = false
                            else creator.elements[input].disabled = true
                        }
                    }
                }, 'Редактировать')
            ),
        )
}

}
