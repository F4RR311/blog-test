const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (ev) => {
    ev.preventDefault()
    if (ev.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (ev) => {
    const type = ev.target.dataset.type;
    if (type === 'lock') {
        const node = ev.target.tagName.toLowerCase() === 'i'
            ? ev.target
            : ev.target.children[0];
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

    } else if (type === 'copy') {
        copyColorClickBoard(ev.target.textContent)
    }
})

function generateRandomColor() {

    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]

    }
    return '#' + color
}

function copyColorClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()
        if (!isInitial) {
            colors.push(color)
        }

        col.style.background = color;
        text.textContent = color;
        setTextColor(text, color)
        setTextColor(button, color)
    })
    UpdateColorHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((col => '#' + col))

    }
    return []
}

function UpdateColorHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)

    }).join('-')

}

setRandomColors(true)
