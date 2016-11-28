import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'
import { includes } from 'lodash'


import style from './style.module.less'

export default class Navigation extends React.Component {
    render () {
        const navLinks = [
            {
                link: '/illustration/',
                title: 'Illustration'
            },{
                link: '/concept/',
                title: 'Concept'
            },{
                link: '/sketches/',
                title: 'Sketches'
            },
        ]

        const currentPath = this.props.currentPath;

        return (
            <span>
                { this.props.currentPath !== '/' &&
                    <Link to={prefixLink('/')} className={style.home}></Link>
                }

                <header className={style.navigation}>
                    <Link to={prefixLink('/about/')} className={style.navigation_about}>
                        Timo Becker
                    </Link>
                    <nav className={style.navigation_main}>
                        {navLinks.map((link, index) => {
                            const active = includes(currentPath, link.link)
                            const className = classNames(style.nav_link, {[style.nav_link_active]: active})

                            return (
                                <Link to={prefixLink(link.link)}
                                        key={index}
                                        className={className}>
                                    {link.title}
                                </Link>
                            )
                        })}
                    </nav>
                </header>
        </span>
        )
    }
}
