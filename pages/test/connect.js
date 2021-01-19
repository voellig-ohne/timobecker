import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
// import { config } from 'config';
import Logo from 'components/logo/logo';
import POINTS from 'components/logo/points';

import 'style/main.less';
import './connect.less';

export default class Index extends React.Component {
    reset() {
        this.refs.logo.reset();
    }
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                {/* <Helmet title={config.siteTitle} /> */}
                <h1>Connect the dots</h1>
                <Logo
                    className="tb_logo"
                    points={POINTS}
                    size={800}
                    margin={20}
                    showLabels={false}
                    mode="connect"
                    ref="logo"
                />
                <br />
                <button onClick={this.reset.bind(this)}>reset</button>
            </div>
        );
    }
}
