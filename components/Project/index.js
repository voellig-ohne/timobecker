import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Article from 'components/Article'

import style from './style.module.less'

export default class Project extends React.Component {
    render () {
        return (
            <Article>
                {this.props.children}
            </Article>
        )
    }
}
