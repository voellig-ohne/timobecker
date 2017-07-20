import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';
import { config } from 'config';
import Logo from 'components/logo/logo';
import POINTS from 'components/logo/points';

import 'style/main.less';
import style from './intro.module.less';

module.exports = React.createClass({
    propTypes() {
        return {
            children: React.PropTypes.any,
        };
    },

    reset: function() {
        this.refs.logo.reset();
    },

    render() {
        const meta = [
            {
                property: 'og:image',
                content: config.siteUrl + '/og-image.png',
            },
            {
                property: 'og:title',
                content: config.siteTitle,
            },
        ];

        return (
            <div className={style.intro}>
                <Logo
                    className={style.logo}
                    points={POINTS}
                    size={400}
                    margin={20}
                    showLabels={false}
                    mode="connect"
                    ref="logo"
                    canvasResize={true}
                />
                <Helmet title={config.siteTitle + ' | Illustrator'} meta={meta} />
            </div>
        );
    },
});
