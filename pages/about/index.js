import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'

import './style.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },

    render () {
        return (
            <DocumentTitle title={config.siteTitle}>
                <article className="page">
                    <header className="page-header">
                        <img src="portrait.jpg" className="page-header-background"/>
                        <div className="page-header-text">
                            <div className="page-header-main">
                                <h1>Timo Becker</h1>
                                <p lang="de">
                                    Mein Anspruch ist es, die Idee zu durchdringen,
                                    Prinzipien aus ihr abzuleiten und diese in einem
                                    Konzept für das perfekte der Idee entsprechende
                                    Produkt zu nutzen.
                                </p>
                                <p lang="en">
                                    It is my utmost desire to pierce the idea, relate
                                    principles to it and form a concept for the perfect
                                    product.
                                </p>
                            </div>
                            <div className="page-header-aside">
                                <p>
                                    noch was kleines über ihn...
                                </p>
                            </div>
                        </div>

                    </header>
                </article>
            </DocumentTitle>
        )
    }
})
