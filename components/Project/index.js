import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import style from './style.module.less'

export default class Project extends React.Component {
    render () {
        return (
            <article className="page">
                {this.props.children}
            </article>
        )
    }
}
