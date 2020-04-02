import { revoke, next } from "./utils/DrawTools";

export default class Show {
    constructor(el) {
        this.canvas = document.getElementById(el)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = "#fff"
        this.moveToSwitch = 1
        this.color = '#000'
        this.lineWidth = 1
        this.ctx.fillRect(0, 0, 1000, 500)
        this.revokeArr = []
        this.nextArr = []
        this.index = 0
        this.revokeIndex = 0
    }

    ononmessage = (msg) => {
        let pathObj = msg.data.split('|')
        this.ctx.lineWidth = this.lineWidth
        // this.ctx.strokeStyle = this.color
        if (pathObj[4]) {
            this.ctx.strokeStyle = pathObj[4]
        }
        if (msg.data === 'revoke') {
            this.revokeToPrve()
            return false
        }
        if (msg.data === 'next') {
            this.revokeToNext()
            return false
        }
        if (msg.data.indexOf('color') > -1) {
            this.color = pathObj[1]
            this.lineWidth = 1
        } else if (msg.data.indexOf('eraser') > -1) {
            this.color = pathObj[1]
            this.lineWidth = pathObj[2]
        } else if (this.moveToSwitch && msg.data !== 'stop' && msg.data !== 'clear') {
            this.ctx.beginPath()
            this.ctx.moveTo(pathObj[0], pathObj[1])
            this.moveToSwitch = 0
            // this.revokeArr = []
            this.revokeArr[this.index] = []
        } else if (!this.moveToSwitch && msg.data === 'stop') {
            this.ctx.beginPath()
            this.ctx.moveTo(pathObj[0], pathObj[1])
            this.moveToSwitch = 1
            this.revokeIndex = this.revokeArr.length - 1
            this.index++
            this.nextArr = []
        } else if (this.moveToSwitch && msg.data === 'clear') {
            this.ctx.strokeStyle = this.ctx.fillStyle
            this.ctx.clearRect(0, 0, 1000, 500)
        }
        if (pathObj.length === 5) {
            this.revokeArr[this.index].push({
                pathObj0: pathObj[0],
                pathObj1: pathObj[1],
                pathObj2: pathObj[2],
                pathObj3: pathObj[3],
                color: pathObj[4],
            })
        }
        this.ctx.lineTo(pathObj[2], pathObj[3])
        this.ctx.stroke()
    }

    revokeToPrve() {
        this.nextArr.unshift(this.revokeArr.pop())
        revoke(this.ctx, this.revokeArr)
    }

    revokeToNext() {
        if (this.nextArr.length > 0) {
            next(this.ctx, this.nextArr[0])
            this.revokeArr.push(this.nextArr.shift())
        }
    }

    // 已优化为上面方法
    revoke2 = () => {
        this.ctx.fillRect(0, 0, 1000, 500)
        this.revokeArr.forEach((item, i) => {
            if (i < this.revokeArr.length - 1) {
                item.forEach((line, i) => {
                    if (i === 0) {
                        this.ctx.beginPath()
                        this.ctx.moveTo(line.pathObj0, line.pathObj1)
                    }
                    this.ctx.lineTo(line.pathObj2, line.pathObj3)
                    this.ctx.stroke()
                })
            }
        })

        // let i = this.revokeIndex
        // this.ctx.lineWidth = this.lineWidth + 0.5
        // this.ctx.strokeStyle = '#fff'
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.revokeArr[i].pathObj0, this.revokeArr[i].pathObj1)
        // console.log(this.revokeArr[i])
        // this.revokeArr[i].forEach((item, i) => {
        //     this.ctx.lineTo(item.pathObj2, item.pathObj3)
        //     this.ctx.stroke()
        // })
        // this.revokeIndex--
    }
}