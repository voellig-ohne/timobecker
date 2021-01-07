import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import style from './style.module.less';

export default function Navigation({ currentPath }) {
    const navLinks = [
        {
            link: '/illustration/',
            title: 'Illustration',
        },
        {
            link: '/design/',
            title: 'Design',
        },
        {
            link: '/live/',
            title: 'Live',
        },
        {
            link: '/sketches/',
            title: 'Sketches',
        },
        {
            link: '/shop/',
            title: 'Shop',
        },
    ];

    return (
        <span>
            {currentPath !== '/' && <Link to={'/'} className={style.home} />}

            <header className={style.navigation}>
                <Link
                    to={'/about/'}
                    className={classNames(style.navigation_about, style.nav_link)}
                    activeClassName={style.nav_link_active}
                    partiallyActive={true}
                >
                    Timo Becker
                </Link>
                <nav className={style.navigation_main}>
                    {navLinks.map((link, index) => (
                        <Link
                            to={link.link}
                            key={index}
                            className={style.nav_link}
                            activeClassName={style.nav_link_active}
                            partiallyActive={true}
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>
            </header>
            <div className={style.force_load_font}>t</div>
        </span>
    );
}
