import React, { Component } from 'react';
import Draw from '../Draw'
import { downScreenshot } from "../utils/DrawTools";
import { CompactPicker } from 'react-color'

export class Drawing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: '#000',
            ws: null,
            canvas: null
        }
    }

    componentDidMount() {
        const ws = new WebSocket('ws://localhost:8999')
        this.setState({
            ws
        })
        const canvas = new Draw('canvas')
        this.setState({
            canvas
        })
        const cleanBtn = document.getElementById('clear')
        canvas.init(ws, cleanBtn)
    }

    componentWillUnmount() {
        this.state.ws.close()
    }

    changeHandler = (colors) => {
        this.setState({
            color: colors.hex
        })
        this.state.canvas.colorChange(colors.hex)
        this.state.ws.send(`color|${colors.hex}`)
    }

    render() {
        return (
            <div>
                <div>
                    drawing
                </div>
                <div>
                    <CompactPicker
                        color={this.state.color}
                        onChange={this.changeHandler}
                    />
                    {/* <ColorPicker
                        animation="slide-up"
                        color={this.state.color}
                        onChange={this.changeHandler}
                    /> */}
                </div>
                <div>
                    <button type="button" id="clear">clear</button>
                    <button type="button" onClick={() => {
                        this.state.canvas.fillStyleChange('#000')
                    }}>黑板</button>
                    <button type="button" onClick={() => {
                        downScreenshot(this.state.canvas.canvas)
                    }}>截图保存</button>
                    <button type="button" onClick={() => {
                        this.state.canvas.eraser(this.state.ws)
                        // this.state.ws.send(`color|${colors.hex}`)
                    }}>橡皮擦</button>
                    <button type="button" onClick={() => {
                        this.state.canvas.revokeToPrve()
                        this.state.ws.send(`revoke`)
                    }}>撤销上一步</button>
                    <button type="button" onClick={() => {
                        this.state.canvas.revokeToNext()
                        this.state.ws.send(`next`)
                    }}>下一步</button>
                    <button type="button" onClick={() => {
                        this.state.canvas.exportData()
                    }}>导出当前画布数据</button>
                </div>
                <canvas id="canvas" width="1000" height="500"></canvas>
            </div>
        )
    }
}

export default Drawing
