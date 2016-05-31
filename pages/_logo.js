import React from 'react'

import paper from 'paper'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

const BLEND_MODE = 'multiply'

const COLOR_PEN = '#0625D4'
const COLOR_DOT = '#FF9800'
const COLOR_LINE = '#4CAF50'

module.exports = React.createClass({
    componentDidMount() {
        const p = new paper.PaperScope();
        p.setup(this._canvas)
        const points = this.props.points

        this.initPaint(p)
        this.drawPoints(p, points)
        this.drawLine(p, points, this.props.order)

        p.view.draw()
    },

    drawLine (p, points, order) {
        const line = new p.Path()
        line.strokeColor = COLOR_LINE
        line.closed = true
        line.blendMode = BLEND_MODE

        order.forEach((index) => {
            line.add(new p.Point(points[index]))
        })
    },

    drawPoints (p, points) {
        const color = new p.Color(COLOR_DOT)

        const dot = new p.Path.Circle({
        	center: [0, 0],
        	radius: 5,
        	fillColor: color,
            blendMode: BLEND_MODE
        })

        const symbol = new p.Symbol(dot);

        const circles = points.forEach((point, index) => {
            const pPoint = new p.Point(point)
            const label = new p.PointText(pPoint.add([-15,-8]))
            label.content = index
            symbol.place(point)
        })
    },

    initPaint (p) {
        let paths = []
        const painter = new p.Tool()
        painter.onMouseDown = onMouseDown
        painter.onMouseDrag = onMouseDrag

        function onMouseDown(event) {
            const path = new p.Path()
            path.strokeColor = new p.Color(COLOR_PEN)
            path.blendMode = BLEND_MODE
            path.add(event.point)
            path.strokeWidth = 3;
            paths.push(path)
        }

        function onMouseDrag (event) {
            paths[paths.length - 1].add(event.point)
            paths[paths.length - 1].smooth()
        }
    },

    render () {
        return (
            <canvas ref={(c) => this._canvas = c}
                width='220'
                height='220'
                className={this.props.className} />
        )
    }
})
