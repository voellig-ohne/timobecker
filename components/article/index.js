import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import './style.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },

    render () {
        return (
            <article className="page">
                <header className="header">
                    <img src="portrait.jpg" className="header-background"/>
                    <div className="header-text">
                        <div className="header-main">
                            <h1>{this.props.title}</h1>
                            {this.props.description}
                        </div>
                        <div className="header-aside">
                            {this.props.descriptionSecondary}
                        </div>
                    </div>
                </header>

                {this.props.children}
            </article>
        )
    }
})
