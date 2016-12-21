import React from 'react'
import classNames from 'classnames'

import style from './style.module.less'

export default class ScrollArrow extends React.Component {
    render() {
        const { className } = this.props

        return (
            <div className={classNames(className, style.container)}>
            </div>
        )
    }
}