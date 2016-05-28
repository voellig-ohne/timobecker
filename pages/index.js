import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from './_logo'

import 'style/main.less'

export default class Index extends React.Component {
    render () {

        const orders = [
            [0,1,2,3,4],
            [0,2,1,3,4],
            [0,1,3,2,4],
            [0,1,2,4,3],
            [4,1,2,3,0]
        ]

        const logos = orders.map((order, index) => {
            const title = order.map((i) => {
                return i + ' '
            }).join('')

            return (
                <div className="tb_logo-wrapper"
                        key={index}>
                    <h2>{title}</h2>
                    <Logo
                        className="tb_logo"
                        order={order} />
                </div>
            )
        })

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    {logos}
                </div>
            </DocumentTitle>
        )
    }
}
