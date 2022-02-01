import React from 'react';
import Logo from '../logo/logo';
import POINTS from '../logo/points';

import * as style from './style.module.less';

export default class Intro extends React.Component {
    reset() {
        this.refs.logo.reset();
    }

    render() {
        return (
            <div className={style.intro}>
                <Logo
                    points={POINTS}
                    size={400}
                    margin={20}
                    showLabels={false}
                    mode="connect"
                    ref="logo"
                    canvasResize={true}
                />
            </div>
        );
    }
}
