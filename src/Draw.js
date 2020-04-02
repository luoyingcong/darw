import { revoke, exportJSON, next } from "./utils/DrawTools";

export default class Draw {
    constructor(el) {

        this.el = el
        this.canvas = document.getElementById(this.el)
        this.ctx = this.canvas.getContext('2d')
        this.stage_info = this.canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
        this.color = '#000'
        this.isEraser = false
        this.data = []
        this.nextData = []
    }

    init(ws, btn) {
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(0, 0, 1000, 500)
        this.canvas.onmousedown = () => {
            this.drawBegin(event, ws)
        }
        this.canvas.onmouseup = () => {
            // console.log(this.data)
            this.drawEnd()
            ws.send('stop')
        }
        this.clearCanvas(ws, btn)
    }
    drawBegin(e, ws) {

        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.ctx.strokeStyle = this.color

        this.ctx.beginPath()
        this.ctx.moveTo(
            e.pageX - this.stage_info.left,
            e.pageY - this.stage_info.top
        )

        this.path.beginX = e.pageX - this.stage_info.left
        this.path.beginY = e.pageY - this.stage_info.top
        
        this.data[this.data.length] = []
        this.nextData = []
        
        document.onmousemove = () => {
            this.drawing(event, ws)
        }
        // document.onmouseup = this.drawEnd
    }
    drawing(e, ws) {
        this.ctx.lineTo(
            e.pageX - this.stage_info.left,
            e.pageY - this.stage_info.top
        )

        this.path.endX = e.pageX - this.stage_info.left
        this.path.endY = e.pageY - this.stage_info.top
        ws.send(this.path.beginX + '|' + this.path.beginY + '|' + this.path.endX + '|' + this.path.endY + '|' + this.ctx.strokeStyle)
        this.data[this.data.length - 1].push({
            pathObj0: this.path.beginX,
            pathObj1: this.path.beginY,
            pathObj2: this.path.endX,
            pathObj3: this.path.endY,
            color: this.ctx.strokeStyle
        })
        this.ctx.stroke()
    }
    drawEnd() {
        document.onmousemove = document.onmouseup = null
    }
    clearCanvas(ws, btn) {
        btn.onclick = () => {
            this.ctx.clearRect(0, 0, 1000, 500)
            ws.send('clear')
        }
    }

    colorChange(color) {
        this.color = color
        this.ctx.lineWidth = 1
    }

    fillStyleChange(color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, 1000, 500)
    }

    eraser(ws) {
        if (this.isEraser) {
            this.color = '#000'
            this.ctx.lineWidth = 1
            ws.send(`eraser|#000|1`)
        } else {
            this.color = '#fff'
            this.ctx.lineWidth = 8
            ws.send(`eraser|#fff|8`)
        }
        this.isEraser = !this.isEraser
    }

    revokeToPrve() {
        this.nextData.unshift(this.data.pop())
        revoke(this.ctx, this.data)
    }

    revokeToNext() {
        if (this.nextData.length > 0) {
            next(this.ctx, this.nextData[0])
            this.data.push(this.nextData.shift())
        }
    }

    exportData() {
        exportJSON(this.data)
    }

}