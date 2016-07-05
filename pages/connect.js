import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from './_logo'
import POINTS from './_points'
import PATHS from './_renderedPaths7.json'

import 'style/main.less'
import './connect.less'

export default class Index extends React.Component {
    constructor() {
        super()
    }
    render () {

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    <h1>Connect the dots</h1>
                    <Logo className="tb_logo"
                            points={POINTS}
                            size={800}
                            margin={20}
                            showLabels={false}
                            mode="connect" />
                </div>
            </DocumentTitle>
        )
    }
}
