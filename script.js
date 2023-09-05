const container = document.querySelector(".container")
const root = document.documentElement

function makeGrid(dim) {
    root.style.setProperty('--width', `${100 / dim}%`)
    for (let i = 0; i < dim * dim; i++) {
        const div = document.createElement("div")
        div.classList.add('grid-element')
        div.addEventListener('mouseenter', paintEvent)
        container.appendChild(div)
    }
}

function randomColor() {
    let color = Math.floor(Math.random() * 256 ** 3)
    return color.toString(16)
}

function rgbArray(rgb) {
    return rgb.slice(4, rgb.length - 1).split(',')
}

function rgbToHex(rgbArray) {
    let hex = ''
    rgbArray.forEach(element => {
        console.log(element)
        hex += element.toString(16).padStart(2, 0)
    })
    return hex
}

function setDecrement(div) {
    let rgb = div.style.backgroundColor
    const array = rgbArray(rgb)
    div.setAttribute('data-r', Math.ceil(array[0] / 10))
    div.setAttribute('data-g', Math.ceil(array[1] / 10))
    div.setAttribute('data-b', Math.ceil(array[2] / 10))
}

function darken(div) {
    let r = div.getAttribute('data-r')
    let g = div.getAttribute('data-g')
    let b = div.getAttribute('data-b')
    let array = rgbArray(div.style.backgroundColor)
    console.log(array)
    
    let darkR = Math.max(0, array[0] - r)
    let darkG = Math.max(0, array[1] - g)
    let darkB = Math.max(0, array[2] - b)
    console.log([darkR, darkG, darkB])

    changeBackgroundColor(div, rgbToHex([darkR, darkG, darkB]))
}

function changeBackgroundColor(div, hexColor) {
    div.style.backgroundColor = '#' + hexColor
}

function paintEvent() {
    if (this.getAttribute('style') == null) {
        changeBackgroundColor(this, randomColor())
        setDecrement(this)
    } else if (this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return
    } else {
        darken(this)
    }
}

makeGrid(16)