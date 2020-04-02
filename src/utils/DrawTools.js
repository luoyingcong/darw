export function downScreenshot(canvas) {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.setAttribute('download', 'screenshot')
    a.click()
}

export function revoke(ctx, data) {
    // data.pop()
    console.log(data)
    ctx.clearRect(0, 0, 1000, 500)
    data.forEach((item) => {
        item.forEach((line, i) => {
            if (i === 0) {
                ctx.strokeStyle = line.color
                ctx.beginPath()
                ctx.moveTo(line.pathObj0, line.pathObj1)
            }
            ctx.lineTo(line.pathObj2, line.pathObj3)
            ctx.stroke()
        })
    })
}

export function next(ctx, data) {
    data.forEach((line, i) => {
        if (i === 0) {
            ctx.strokeStyle = line.color
            ctx.beginPath()
            ctx.moveTo(line.pathObj0, line.pathObj1)
        }
        ctx.lineTo(line.pathObj2, line.pathObj3)
        ctx.stroke()
    })
}

export function exportJSON(data) {
    console.log(JSON.stringify(data))
}