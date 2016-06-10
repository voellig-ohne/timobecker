import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from './_logo'
import POINTS from './_points'
import PATHS from './_renderedPaths7.json'

import 'style/main.less'

export default class Index extends React.Component {
    render () {

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    <h1>Malen, Timo.</h1>

                </div>
            </DocumentTitle>
        )
    }
}
