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
}
    
    
    