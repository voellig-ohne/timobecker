import React from 'react'

import p from 'paper'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

module.exports = React.createClass({
    componentDidMount() {
        console.log('mounted!', this._canvas)
        p.setup(this._canvas)

        this.initPaint(p)
    },

    initPaint (p) {
        let paths = []
        const painter = new p.Tool()
        painter.onMouseDown = onMouseDown
        painter.onMouseDrag = onMouseDrag

        function onMouseDown(event) {
            const path = new p.Path()
            path.strokeColor = 'black'
            path.add(event.point)
            paths.push(path)

            console.log(paths)
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
