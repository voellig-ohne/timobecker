import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'

import style from './style.module.less'

export default class Footer extends React.Component {
    render() {
        const { next, prev } = this.props

        return (
            <footer className={style.nextPrev}>
                { prev ? 
                    <Link to={prev.path} className={style.nextPrev_link}>
                        <div className={style.nextPrev_label}>
                            vorheriges
                        </div>            
                        <div className={style.nextPrev_title}>
                            {prev.data.title}
                        </div>
                    </Link> : null 
                }
                { next ?
                    <Link to={next.path} className={style.nextPrev_link}>
                        <div className={style.nextPrev_label}>
                            nächstes
                        </div>     
                        <div className={style.nextPrev_title}>
                            {next.data.title}
                        </div>
                    </Link> : null
                }
            </footer>
        )
    }
}