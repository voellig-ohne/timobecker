import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'
import Illustration from 'components/Illustration' 

import style from './style.module.less'

export default class Footer extends React.Component {
    render() {
        const { next, prev } = this.props
        const nextPrevSame = prev && prev.data.title === next.data.title

        return (
            <footer className={style.container_outer}>
                <div className={style.container}>
                    { prev && !nextPrevSame ? 
                        <Link to={prev.path} className={style.nextPrev_link}>
                            <div className={style.nextPrev_label}>
                                vorheriges
                            </div>            
                            <div className={style.nextPrev_title}>
                                {prev.data.title}
                            </div>
                        </Link> : null 
                    }
                    <div className={style.content}>
                        <a href="https://www.facebook.com/timo.becker.54" className={style.icon} title="Facebook" target="_blank">
                            <Illustration illustration="icons_facebook" />
                        </a>
                        <a href="mailto:mail@timobecker.com" className={style.icon} title="Mail">
                            <Illustration illustration="icons_mail" />
                        </a>
                        <a href="http://volligohne.de/projekte/timobecker/" className={style.icon} title="Völlig Ohne" target="_blank">
                            <Illustration illustration="icons_vo" />
                        </a>
                        <Link to="/impressum/" className={style.icon} title="Impressum / Kontakt">
                            <Illustration illustration="icons_impressum" />
                        </Link>
                    </div>
                    { next && !nextPrevSame ?
                        <Link to={next.path} className={style.nextPrev_link}>
                            <div className={style.nextPrev_label}>
                                nächstes
                            </div>     
                            <div className={style.nextPrev_title}>
                                {next.data.title}
                            </div>
                        </Link> : null
                    }
                </div>
                <div className={style.vo_hint}>
                    website by <a href="http://volligohne.de/projekte/timobecker/">völlig ohne</a>
                </div>
            </footer>
        )
    }
}