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
                <div className="about">
                    <div className="about-content">
                        <div className="about-portrait">
                            <img src="portrait.jpg" />
                        </div>
                        <div>
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
                    </div>
                </div>
            </DocumentTitle>
        )
    }
})
