import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from 'components/logo/logo'
import POINTS from 'components/logo/points'

import 'style/main.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },

    reset: function() {
        this.refs.logo.reset()
    },

    getInitialState: function() {
        if (typeof window !== 'undefined') {
            return {windowSize: this.getWindowSize()};
        } else {
            return {windowSize: {height: 1000, widht: 1000}};
        }
    },

    componentDidMount: function() {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.handleResize);
        }
    },

    componentWillUnmount: function() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.handleResize);
        }
    },

    handleResize: function() {
        if (typeof window !== 'undefined') {
            this.setState({windowSize: this.getWindowSize()});
        }
    },

    getWindowSize: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },

    render () {
        return (
            <DocumentTitle title={config.siteTitle}>
                <div className="intro">
                    <Logo className="tb_logo"
                            points={POINTS}
                            size={400}
                            margin={20}
                            showLabels={false}
                            mode="connect"
                            ref="logo"
                            canvasSize={this.state.windowSize} />
                    <button onClick={this.reset}
                            className="intro-reset">
                        neu <span className="english">new</span>
                    </button>

                </div>
            </DocumentTitle>
        )
    }
})
