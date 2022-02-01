import React from 'react';
import { Link } from 'gatsby';
import LinkedIn from "./icons_linkedin.svg";
import Instagram from "./icons_instagram.svg";
import VO from "./icons_vo.svg";
import Mail from "./icons_mail.svg";
import Impressum from "./icons_impressum.svg";

import * as style from './style.module.less';

export default function Footer({ next, prev }) {
    console.log('huhu', LinkedIn)
    return (
        <footer className={style.container_outer}>
            <div className={style.container}>
                {prev && (
                    <Link to={prev.fields.slug} className={style.nextPrev_link}>
                        <div className={style.nextPrev_label}>previous</div>
                        <div className={style.nextPrev_title}>{prev.frontmatter.title}</div>
                    </Link>
                )}
                <div className={style.content}>
                    <LinkIcon
                        href="https://de.linkedin.com/in/timobecker-design"
                        title="LinkedIn"
                        img={LinkedIn}
                    />
                    <LinkIcon
                        href="https://www.instagram.com/timo_becker_/"
                        title="Instagram"
                        img={Instagram}
                    />
                    <LinkIcon href="mailto:mail@timobecker.com" title="Mail" img={Mail} />
                    <LinkIcon
                        href="http://volligohne.de/projekte/timobecker/"
                        title="Völlig Ohne"
                        img={VO}
                    />
                    <LinkIcon href="/impressum/" title="Impressum / Kontakt" img={Impressum} />
                </div>
                {next && (
                    <Link to={next.fields.slug} className={style.nextPrev_link}>
                        <div className={style.nextPrev_label}>next</div>
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

function LinkIcon({ href, title, img }) {
    return (
        <a href={href} className={style.icon} title={title}>
            <img alt={title} src={img} />
        </a>
    );
}
