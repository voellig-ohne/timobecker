import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import style from './style.module.less'

export default class Navigation extends React.Component {
    render () {
        const navLinks = [
            {
                link: '/concept/',
                title: 'Concept'
            },{
                link: '/sketches/',
                title: 'Sketches'
            },{
                link: '/illustration/',
                title: 'Illustration'
            },
        ]

        return (
            <span>
                { this.props.currentPath !== '/' &&
                    <Link to={prefixLink('/')} className={style.home}></Link>
                }

                <header className={style.navigation}>
                    <Link to={prefixLink('/about/')}>
                        Timo Becker
                    </Link>
                    <nav>
                        {navLinks.map((link, index) => {
                            return (
                                <Link to={prefixLink(link.link)}
                                        key={index}
                                        className={style.nav_link}>
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
