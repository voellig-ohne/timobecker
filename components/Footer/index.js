import React from 'react';
import { Link } from 'gatsby';

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
                        <LinkIcon
                            href="https://de.linkedin.com/in/timobecker-design"
                            title="LinkedIn"
                            img={require('./icons_linkedin.svg')}
                        />
                        <LinkIcon
                            href="https://www.instagram.com/timo_becker_/"
                            title="Instagram"
                            img={require('./icons_instagram.svg')}
                        />
                        <LinkIcon href="mailto:mail@timobecker.com" title="Mail" img={require('./icons_mail.svg')} />
                        <LinkIcon
                            href="http://volligohne.de/projekte/timobecker/"
                            title="Völlig Ohne"
                            img={require('./icons_vo.svg')}
                        />
                        <LinkIcon
                            href="/impressum/"
                            title="Impressum / Kontakt"
                            img={require('./icons_impressum.svg')}
                        />
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

function LinkIcon({ href, title, img }) {
    return (
        <a href={href} className={style.icon} title={title}>
            <img alt={title} src={img} />
        </a>
    );
}
