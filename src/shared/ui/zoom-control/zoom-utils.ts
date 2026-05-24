

function incZoom(value: number, step: number) {
    return (value + step)
}

function decZoom(value: number, step: number) {
    return Math.max(100, value - step)
}

export {incZoom, decZoom}