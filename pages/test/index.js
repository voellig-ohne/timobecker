import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';
import { config } from 'config';

import 'style/main.less';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Helmet title={config.siteTitle} />
                <h1>Timos Website...</h1>
                <Link to={prefixLink('/test/list/')}>liste aller kombinationen</Link>
                <br />
                <Link to={prefixLink('/test/paint/')}>malen!</Link>
                <br />
                <Link to={prefixLink('/test/connect/')}>vebinden!</Link>
                <br />
                <Link to={prefixLink('/test/project/')}>projezieren!</Link>
            </div>
        );
    }
}
