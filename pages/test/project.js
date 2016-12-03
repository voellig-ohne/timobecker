import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from 'components/logo/logo'
import POINTS from 'components/logo/points'

import 'style/main.less'
import style from './project.module.less'

const KEY_TO_DOT = {
    a: 0,
    s: 1,
    d: 2,
    f: 3,
    g: 4,
    h: 5,
    j: 6
}

export default class Projection extends React.Component {

    reset() {
        this.refs.logo.reset()
    }

    componentDidMount() {
        if (!STATIC) {
            window.addEventListener('keypress', (e) => {
                if (KEY_TO_DOT[e.key] !== undefined) {
                    this.connect(KEY_TO_DOT[e.key])
                }
                if (e.code === 'Space') {
                    this.reset()
                }
            })
        }
    }

    connect(dot) {
        this.refs.logo.connect(dot)
    }

    render() {
        return (
            <DocumentTitle title={config.siteTitle}>
                <div className={style.container}>
                    <Logo className={style.painting}
                            points={POINTS}
                            size={720}
                            margin={20}
                            showLabels={false}
                            mode="connect"
                            ref="logo"
                            typing={true} />
                </div>
            </DocumentTitle>
        )
    }
}
