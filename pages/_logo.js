import React from 'react'

import p from 'paper'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

module.exports = React.createClass({
    componentDidMount() {
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

        p.view.draw()
    },

    drawPoints (p, points) {
        const dot = new p.Path.Circle({
        	center: [0, 0],
        	radius: 5,
        	fillColor: 'black'
        });

        const symbol = new p.Symbol(dot);

        const circles = points.map((point) => {
            return symbol.place(point)
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
                width='500'
                height='500' />
        )
    }
})
