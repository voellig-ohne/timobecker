import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';
import { config } from 'config';
import Logo from 'components/logo/logo';
import POINTS from 'components/logo/points';
import sternchen from '!svg-inline-loader!./sternchen.svg';

import 'style/main.less';
import style from './project.module.less';

const KEY_TO_DOT = {
    a: 0,
    s: 1,
    d: 2,
    f: 3,
    g: 4,
    h: 5,
    j: 6,
};

export default class Projection extends React.Component {
    reset() {
        this.refs.logo.reset();
    }

    componentDidMount() {
        if (!STATIC) {
            window.addEventListener('keypress', e => {
                if (KEY_TO_DOT[e.key] !== undefined) {
                    this.connect(KEY_TO_DOT[e.key]);
                }
                if (e.code === 'Space') {
                    this.reset();
                }
            });
        }
    }

    connect(dot) {
        this.refs.logo.connect(dot);
    }

    render() {
        return (
            <div className={style.container}>
                <Helmet title={config.siteTitle} />
                <div className={style.canvasContainer}>
                    <Logo
                        className={style.painting}
                        points={POINTS}
                        size={700}
                        margin={20}
                        showLabels={false}
                        mode="connect"
                        ref="logo"
                        typing={true}
                    />
                </div>

                <div className={style.printStuff}>
                    <div className={style.timo}>
                        <p>
                            IDENTITÄT FÜR TIMO BECKER / TIMOBECKER.COM<br />
                            logo, website, installation
                        </p>
                        <p>
                            idee & umsetzung: völlig ohne <br />
                            illustration: timo becker
                        </p>
                    </div>
                    <div className={style.vo}>
                        <p>
                            <div className={style.logo} dangerouslySetInnerHTML={{ __html: sternchen }} />
                            völlig ohne werkschau 2017 <br />
                            völligohne.de
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
