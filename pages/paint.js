import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from './_logo'
import POINTS from './_points'
import PATHS from './_renderedPaths7.json'

import 'style/main.less'
import './paint.less'

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            activePath: undefined
        }
        this.handleClick = this.handleClick.bind(this);
        this.paintings = {}
    }
    handleClick(path) {
        this.setState({activePath: path});
    }
    openNext() {
        if (this.state.activePath) {
            const current = this.getActivePathIndex()
            this.setState({activePath: PATHS.uniques[current + 1]})
        } else {
            this.setState({activePath: PATHS.uniques[0]})
        }
    }
    openPrev() {
        if (this.state.activePath) {
            const current = this.getActivePathIndex()
            this.setState({activePath: PATHS.uniques[current - 1]})
        } else {
            this.setState({activePath: PATHS.uniques[0]})
        }
    }
    getActivePathIndex () {
        if (this.state.activePath) {
            return PATHS.uniques.map((path) => {
                return path.join('')
            }).indexOf(this.state.activePath.join(''))
        } else {
            return -1
        }
    }
    handlePaint(paths) {
        if (this.state.activePath) {
            this.paintings[this.state.activePath.join('')] = paths
            this.forceUpdate()
        }
    }
    exportPaintings () {
        const downloadElement = document.createElement("a")
        const file = new Blob([JSON.stringify(this.paintings)], {type: 'text/plain'})
        downloadElement.href = URL.createObjectURL(file)
        downloadElement.download = 'paintings.json';
        downloadElement.click();
    }
    handleImport (event) {
        const reader = new FileReader()
        const file = event.target.files[0]
        const that = this;

        reader.onload = (function() {
            return function(e) {
                const imported = JSON.parse(e.target.result)
                that.paintings = imported
                that.forceUpdate()
            };
        })(file);

        reader.readAsText(file)
    }
    deletePainting () {
        delete this.paintings[this.state.activePath.join('')]
        this.forceUpdate()
    }
    render () {
        const pathList = PATHS.uniques.map((path) => {
            const boundClick = this.handleClick.bind(null, path)
            let className = 'paint-list_item' + ((this.state.activePath === path) ? ' paint-list_item--active' : '')
            className += this.paintings[path.join('')] ? ' paint-list_item--painted' : ''

            return (
                <li key={path}
                        onClick={boundClick}
                        className={className}>
                    {path}
                </li>
            )
        })

        const activePath = (this.state.activePath) ? this.state.activePath.join('') : 'nichts'

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    <h1>Malen, Timo.</h1>
                    ausgewählt: {activePath}
                    <br />

                    <div className="logo_container">
                        <Logo className="tb_logo"
                                points={POINTS}
                                order={this.state.activePath}
                                painting={this.state.activePath && this.paintings[this.state.activePath.join('')]}
                                size={400}
                                margin={20}
                                showLabels={false}
                                painted={this.handlePaint.bind(this)} />
                    </div>
                    <br />
                    <button onClick={this.deletePainting.bind(this)}>
                        aktuelles löschen
                    </button>
                    <hr />
                    <button onClick={this.openPrev.bind(this)}>
                        vorheriges
                    </button>
                    <button onClick={this.openNext.bind(this)}>
                        nächstes
                    </button>
                    <hr />
                    <h2>exportieren:</h2>
                    <button onClick={this.exportPaintings.bind(this)}>
                        export
                    </button>
                    <h2>importieren:</h2>
                    <input type="file" id="files" name="files[]" onChange={this.handleImport.bind(this)} />
                    <h2>Liste aller Kombinationen:</h2>
                    <ul className="paint-list">
                        {pathList}
                    </ul>

                </div>
            </DocumentTitle>
        )
    }
}
