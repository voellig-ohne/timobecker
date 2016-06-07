import React from 'react'
import _ from 'lodash'

import paper from 'paper'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

const BLEND_MODE = 'multiply'

const COLOR_PEN = '#b82020'
const COLOR_DOT = 'black'
const COLOR_LINE = 'black'

const SIZES = {
    POINT_RADIUS: 1,
    PEN_STROKE_WIDTH: 1,
    LINE_STROKE_WIDTH: 2
}

module.exports = React.createClass({
    componentDidMount() {
        this.SIZES_RELATIVE = _.mapValues(SIZES, (size) => {
            return this.getRelativeValue(size)
        })

        const points = this.props.points.map((point) => {
            return point.map((position) => {
                const withoutMargin = this.getRelativeValue(position)
                return this.props.margin + (withoutMargin / 100 * (100 - this.props.margin))
            })
        })

        const p = new paper.PaperScope();
        p.setup(this._canvas)

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
        line.strokeWidth = this.SIZES_RELATIVE.LINE_STROKE_WIDTH
        line.strokeJoin = 'round'

        order.forEach((index) => {
            line.add(new p.Point(points[index]))
        })
    },

    drawPoints (p, points) {
        const color = new p.Color(COLOR_DOT)

        const dot = new p.Path.Circle({
        	center: [0, 0],
        	radius: this.SIZES_RELATIVE.POINT_RADIUS,
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

    getRelativeValue (value) {
        return value / 100 * this.props.size
    },

    initPaint (p) {
        let paths = []
        const painter = new p.Tool()
        const strokeWidth = this.SIZES_RELATIVE.PEN_STROKE_WIDTH
        painter.onMouseDown = onMouseDown
        painter.onMouseDrag = onMouseDrag

        function onMouseDown(event) {
            const path = new p.Path()
            path.strokeColor = new p.Color(COLOR_PEN)
            path.blendMode = BLEND_MODE
            path.add(event.point)
            path.strokeWidth = strokeWidth
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
                width={this.props.size}
                height={this.props.size}
                className={this.props.className} />
        )
    }
})
