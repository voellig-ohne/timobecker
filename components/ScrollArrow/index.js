import React from 'react'
import classNames from 'classnames'

import style from './style.module.less'

export default class ScrollArrow extends React.Component {
    render() {
        const { className } = this.props

        return (
            <div className={classNames(className, style.container)}>
                <div className={classNames(style.dot, style.dot_1)} />
                <div className={classNames(style.dot, style.dot_2)} />
                <div className={classNames(style.dot, style.dot_3)} />
            </div>
        )
    }
}