import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from 'components/logo/logo'
import POINTS from 'components/logo/points'
//import findPaths from 'components/logo/findPaths'
import PATHS from 'components/logo/renderedPaths7.json'

import 'style/main.less'
import style from './style.module.less'

export default class Index extends React.Component {
    render () {
        // const paths = findPaths(POINTS.length)

        const uniques = PATHS.uniques

        const logos = uniques.map((order, index) => {
            const title = order.map((i) => {
                return i + ' '
            }).join('')

            return (
                <div className={style.wrapper}
                    key={index}>
                    <h2>{title}</h2>
                    <Logo
                        className={style.logo}
                        points={POINTS}
                        order={order}
                        size={200}
                        margin={20}
                        showLabels={false} />
                </div>
            )
        })

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    <h1>{POINTS.length} POINTS, {uniques.length} variations: </h1>
                    {logos}
                </div>
            </DocumentTitle>
        )
    }
}
