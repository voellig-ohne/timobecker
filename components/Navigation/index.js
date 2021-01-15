import React, { useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import style from './style.module.less';

export default function Navigation({ currentPath }) {
    const [menuOpen, setMenuOpen] = useState(false);

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

                <nav
                    className={classNames(style.navigation_main, { [style.navigation_main_open]: menuOpen })}
                    id="mainMenu"
                    role="menu"
                >
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
                <button
                    className={classNames(style.menu_button, style.nav_link, { [style.nav_link_active]: menuOpen })}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-controls="mainMenu"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                >
                    Menu
                </button>
            </header>
            <div className={style.force_load_font}>t</div>
        </span>
    );
}
