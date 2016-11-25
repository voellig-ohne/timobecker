import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Article from 'components/Article'
import { filter, includes, flow, map } from 'lodash'

import style from './style.module.less'

export default class ProjectList extends React.Component {
    render () {

        const currentPath = this.props.children.props.route.path
        const pages = this.props.children.props.route.pages

        const projects = flow(
            (pages) => filter(pages, page => isProject(page, currentPath)),
            (pages) => map(pages, Project)
        )(pages)

        const mainAdditions = (
            <div>
                <h2>Projekte</h2>
                { projects }
            </div>
        )

        return (            
            <Article mainAddition={ mainAdditions }>
                {this.props.children}
            </Article>
        )
    }
}

function isProject(page, currentPath) {
    return page.path !== currentPath && includes(page.path, currentPath)
}

function Project( project ) {
    const { path } = project

    return (
        <Link to={path} key={path} className={style.projectLink}>
            { project.data.title }
        </Link>
    )
} 