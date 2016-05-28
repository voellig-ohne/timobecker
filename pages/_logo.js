import React from 'react'

import paper from 'paper'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

module.exports = React.createClass({
    componentDidMount() {
        const p = new paper.PaperScope();
        p.setup(this._canvas)

        const points = [
            [100, 120],
            [250, 160],
            [110, 250],
            [300, 300],
            [330, 120]
        ]

        this.initPaint(p)
        this.drawPoints(p, points)
        this.drawLine(p, points, this.props.order)

        p.view.draw()
    },

    drawLine (p, points, order) {
        const line = new p.Path()
        line.strokeColor = 'black'
        line.closed = true

        order.forEach((index) => {
            console.log(points[index])
            line.add(new p.Point(points[index]))
        })
    },

    drawPoints (p, points) {
        const dot = new p.Path.Circle({
        	center: [0, 0],
        	radius: 5,
        	fillColor: 'black'
        })

        const symbol = new p.Symbol(dot);

        const circles = points.forEach((point, index) => {
            console.log(index, point)
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
            path.strokeColor = 'red'
            path.add(event.point)
            paths.push(path)
        }

        function onMouseDrag (event) {
            paths[paths.length - 1].add(event.point)
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
