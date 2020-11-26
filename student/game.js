
window.onload = function () {
    function Creater(root) {
        this.root = root
        this.elements = {}
        Creater.prototype.genID = function (ref = 'ref') {
            return ref + '_' + Math.random().toString(36).substring(2, 9)
        }
        Creater.prototype.add = function (tag, object, ...children) {
            const { id, className, style, data, attrs, events, ref, ...props } = object
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
            if (attrs) {
                Object.keys(attrs).forEach(key => {
                    element.addEventListener(key, attrs[key])
                })
            }
            if (events) {
                Object.keys(events).forEach(key => {
                    element.addEventListener(key, events[key])
                })
            }
            if (ref) this.elements[ref] = element
            if (children) element.append(...children)
            return element
        }
        Creater.prototype.publish = function (...elements) {
            this.root.append(...elements)
        }
    }

    function drawSizeElements() {
        const input = creator.genID('input')
        const button = creator.genID('button')
        return creator.add('div', { className: 'input-group mb-3' },
            creator.add('input', { className: 'form-control', type: 'text', ref: input }),
            creator.add('div', { className: 'input-group-append' },
                creator.add('button', {
                    className: 'btn btn-outline-secondary',
                    type: 'button',
                    ref: button,
                    events: {
                        'click': () => {
                            let size = new Number(creator.elements[input].value)
                            drawDesk(size)
                        }
                    }
                }, 'Создать')
            ),
        )
    }

    window.creator = new Creater(document.getElementById('root'))
    let genMap = (size) => [...Array(size * size).keys()].sort(() => Math.random() - 0.5)
        .map((a, i) => ({
            value: a ? a : '',
            ref: creator.genID('elem'),
            index: i,
            x: i % size,
            y: Math.trunc(i / size)
        }))
    let desk = creator.genID('desk')

    let checkWin = (map) => map.every(a => a.index == a.value - 1 || a.value == '' && a.index == map.length - 1)

    let swapValues = (empty, elem) => {
        if (!empty || !elem) return
        empty.value = elem.value
        elem.value = ''
        elem.element.innerText = elem.value
        empty.element.innerText = empty.value
    }
    let map
    let getEmpty = (map) => map.find(a => !a.value)

    function drawDesk(size) {
        map = genMap(size)
        let counter = 0
        let currRow = creator.add('div', { className: 'row' })
        let rows = [currRow]
        while (true) {
            let elem = map[counter]
            elem.element = creator.add('div', {
                className: 'col bg-secondary border text-center', style: 'height: 30px', ref: elem.ref,
                events: {
                    click: () => {
                        let empty = map.find(a => !a.value)
                        if (Math.abs(elem.x - empty.x) + Math.abs(elem.y - empty.y) != 1) return
                        swapValues(empty, elem)
                        if (checkWin(map)) alert('Победа!')
                    },
                }
            }, elem.value)
            currRow.append(elem.element)

            counter++
            if (counter % size != 0) continue
            if (counter >= map.length) break
            currRow = creator.add('div', { className: 'row' })
            rows.push(currRow)
        }
        let deskElem = creator.elements[desk]
        if (deskElem) deskElem.parentNode.removeChild(deskElem)
        creator.publish(creator.add('div', { className: 'container', ref: desk }, ...rows))
    }

    document.addEventListener('keyup', (event) => {
        if (!map) return
        let empty = getEmpty(map)
        switch (event.code) {
            case 'ArrowLeft':
                swapValues(empty, map.find(a => empty.x == a.x - 1 && empty.y == a.y))
                break;
            case 'ArrowUp':
                swapValues(empty, map.find(a => empty.y == a.y - 1 && empty.x == a.x))
                break;
            case 'ArrowRight':
                swapValues(empty, map.find(a => empty.x == a.x + 1 && empty.y == a.y))
                break;
            case 'ArrowDown':
                swapValues(empty, map.find(a => empty.y == a.y + 1 && empty.x == a.x))
                break;
            default:
                break;
        }
        if (checkWin(map)) alert('Победа!')
    })

    creator.publish(drawSizeElements())

}
    
