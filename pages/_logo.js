import React from 'react'
import _ from 'lodash'

import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

const BLEND_MODE = 'multiply'

const COLOR_PEN = '#e80101'
const COLOR_DOT = 'black'
const COLOR_LINE = 'black'

const SIZES = {
    POINT_RADIUS: 1,
    PEN_STROKE_WIDTH: 1,
    LINE_STROKE_WIDTH: 2
}

// only conditionally import paperjs for static page building
let paper;
if (typeof window !== 'undefined') {
    paper = require('paper')
}

module.exports = React.createClass({
    init() {
        if (this.props.order) {
            this.drawLine(this.PaperScope, this.points, this.props.order)
        }
        if (this.props.mode === 'paint') {
            this.initPaint(this.PaperScope)
        }
        if (this.props.mode === 'connect') {
            this.initConnect()
        }
        this.PaperScope.view.draw()
    },

    componentDidMount() {
        this.SIZES_RELATIVE = _.mapValues(SIZES, (size) => {
            return this.getRelativeValue(size)
        })
        this.relativeMargin = this.getRelativeValue(this.props.margin)

        this.points = this.props.points.map((point) => {
            return point.map((position) => {
                const withoutMargin = this.getRelativeValue(position)
                return this.relativeMargin + (withoutMargin / 100 * (100 - this.props.margin * 2))
            })
        })

        this.PaperScope = new paper.PaperScope();
        this.PaperScope.setup(this._canvas)

        this.drawPoints(this.PaperScope, this.points)

        this.init()
    },

    componentDidUpdate() {
        this.init()
    },

    drawLine (p, points, order) {
        this.initConnectionLine()

        order.forEach((index) => {
            this.line.add(new p.Point(points[index]))
        })
    },

    drawPoints (p, points) {
        const that = this
        const color = new p.Color(COLOR_DOT)

        const dot = new p.Path.Circle({
        	center: [0, 0],
        	radius: this.SIZES_RELATIVE.POINT_RADIUS,
        	fillColor: color,
            blendMode: BLEND_MODE
        })

        const symbol = new p.Symbol(dot)

        points.forEach((point, index) => {
            if (this.props.showLabels) {
                const pPoint = new p.Point(point)
                const label = new p.PointText(pPoint.add([-15,-8]))
                label.content = index
            }

            const placed = symbol.place(point)

            if (this.props.mode === 'connect') {
                placed.onMouseEnter = handleDotEnter
            }
        })

        function handleDotEnter () {
            that.addConnectionDot(this.position)
        }
    },

    addConnectionDot (position) {
        const p = this.PaperScope
        this.line.add(new p.Point(position))
    },

    getRelativeValue (value) {
        return value / 100 * this.props.size
    },

    initConnectionLine () {
        if (!this.line) {
            this.line = new this.PaperScope.Path()
            this.line.strokeColor = COLOR_LINE
            this.line.closed = this.props.mode === 'paint'
            this.line.blendMode = BLEND_MODE
            this.line.strokeWidth = this.SIZES_RELATIVE.LINE_STROKE_WIDTH
            this.line.strokeJoin = 'round'
        } else {
            this.line.removeSegments()
        }
    },

    initPaint (p) {

        const paths = []
        const strokeWidth = this.SIZES_RELATIVE.PEN_STROKE_WIDTH
        const that = this;

        if (!this.painter) {
            this.painter = new p.Tool()
        }

        if (this.paintGroup) {
            this.paintGroup.removeChildren()
        } else {
            this.paintGroup = new p.Group()
        }

        if (this.props.painting) {
            this.paintGroup.importJSON(this.props.painting)
        }

        this.paintGroup.addChildren(paths)

        this.painter.onMouseDown = onMouseDown
        this.painter.onMouseDrag = onMouseDrag
        this.painter.onMouseUp = onMouseUp

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

        function onMouseUp (event) {
            that.paintGroup.addChild(paths[paths.length - 1])
            that.props.painted(that.paintGroup.exportJSON());
        }
    },

    initConnect () {
        const p = this.PaperScope

        this.initConnectionLine()

        console.log('initializing connect')
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
