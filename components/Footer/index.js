import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Illustration from '../Illustration';

import style from './style.module.less';

export default class Footer extends React.Component {
    render() {
        const { next, prev } = this.props;

        return (
            <footer className={style.container_outer}>
                <div className={style.container}>
                    {prev && (
                        <Link to={prev.fields.slug} className={style.nextPrev_link}>
                            <div className={style.nextPrev_label}>vorheriges</div>
                            <div className={style.nextPrev_title}>{prev.frontmatter.title}</div>
                        </Link>
                    )}
                    <div className={style.content}>
                        <a
                            href="https://de.linkedin.com/in/timobecker-design"
                            className={style.icon}
                            title="LinkedIn"
                            target="_blank"
                        >
                            <img src={require('./icons_linkedin.svg')} />
                        </a>
                        <a
                            href="https://www.instagram.com/timo_becker_/"
                            className={style.icon}
                            title="Instagram"
                            target="_blank"
                        >
                            <img src={require('./icons_instagram.svg')} />
                        </a>
                        <a href="mailto:mail@timobecker.com" className={style.icon} title="Mail">
                            <img src={require('./icons_mail.svg')} />
                        </a>
                        <a
                            href="http://volligohne.de/projekte/timobecker/"
                            className={style.icon}
                            title="Völlig Ohne"
                            target="_blank"
                        >
                            <img src={require('./icons_vo.svg')} />
                        </a>
                        <Link to="/impressum/" className={style.icon} title="Impressum / Kontakt">
                            <img src={require('./icons_impressum.svg')} />
                        </Link>
                    </div>
                    {next && (
                        <Link to={next.fields.slug} className={style.nextPrev_link}>
                            <div className={style.nextPrev_label}>nächstes</div>
                            <div className={style.nextPrev_title}>{next.frontmatter.title}</div>
                        </Link>
                    )}
                </div>
                <div className={style.vo_hint}>
                    website by <a href="http://volligohne.de/projekte/timobecker/">völlig ohne</a>
                </div>
            </footer>
        );
    }
}
