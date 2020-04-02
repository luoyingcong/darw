import React, { Component } from 'react'
import { downScreenshot } from "../utils/DrawTools";
import Show from '../Show'

export class showing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ws: null,
            show: null
        }
    }
    componentDidMount() {
        const ws = new WebSocket('ws://localhost:8999')
        const show = new Show('showing')
        this.setState({
            ws,
            show
        })
        ws.onmessage = show.ononmessage
    }

    componentWillUnmount() {
        this.state.ws.close()
    }

    render() {
        return (
            <div>
                <div>
                    showing
                </div>
                <div>
                    <button type="button" onClick={() => {
                        downScreenshot(this.state.show.canvas)
                    }}>截图保存</button>
                </div>
                <canvas id="showing" width="1000" height="500"></canvas>
            </div>
        )
    }
}

export default showing

        // const canvas = document.getElementById('showing')
        // this.setState({
        //     canvas
        // })
        // const ctx = canvas.getContext('2d')
        // ctx.fillStyle = "#fff"
        // let moveToSwitch = 1
        // this.setState({
        //     ws
        // })
        // ws.onmessage = msg => {
        //     let pathObj = msg.data.split('|')
        //     ctx.strokeStyle = this.state.color
        //     if (msg.data.indexOf('color') > -1) {
        //         this.state.color = pathObj[1]
        //     } else if (moveToSwitch && msg.data !== 'stop' && msg.data !== 'clear') {
        //         ctx.beginPath()
        //         ctx.moveTo(pathObj[0], pathObj[1])
        //         moveToSwitch = 0
        //     } else if (!moveToSwitch && msg.data === 'stop') {
        //         ctx.beginPath()
        //         ctx.moveTo(pathObj[0], pathObj[1])
        //         moveToSwitch = 1
        //     } else if (moveToSwitch && msg.data === 'clear') {
        //         ctx.clearRect(0, 0, 1000, 500)
        //     }

        //     ctx.lineTo(pathObj[2], pathObj[3])
        //     ctx.stroke()
        // }