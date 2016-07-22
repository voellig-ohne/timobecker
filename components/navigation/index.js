import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import './style.less'

module.exports = React.createClass({
    render () {
        const navLinks = [
            {
                link: '/konzept',
                title: 'Konzept'
            },{
                link: '/event',
                title: 'Event'
            },{
                link: '/illustration',
                title: 'Illustration'
            },
        ]
        return (
            <header className="navigation">
                <Link to={'/about/'}>
                    Timo Becker
                </Link>
                <nav>
                    {navLinks.map((link, index) => {
                        return (
                            <Link to={prefixLink(link.link)}
                                    key={index}
                                    className="navigation-nav_link">
                                {link.title}
                            </Link>
                        )
                    })}
                </nav>
            </header>
        )
    }
})
