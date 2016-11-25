import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Article from '../../components/article'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },

    render () {
        const content = {
            title: 'Timo Becker',
            background: 'portrait.jpg',
            body: (
                <span>
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
                </span>
            )
        }
        return (
            <DocumentTitle title={config.siteTitle}>
                <Article {...content}>
                </Article>
            </DocumentTitle>
        )
    }
})
