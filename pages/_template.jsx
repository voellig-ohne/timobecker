import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Navigation from 'components/Navigation'
import Article from 'components/Article'
import Project from 'components/Project'
import ProjectList from 'components/ProjectList'
import { startsWith } from 'lodash'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        const isTest = startsWith(this.props.children.props.route.path, '/test/')

        return (
            <div>
                <main className="main_content">
                    {
                        chooseTemplate(this.props.children)
                    }                    
                </main>
                {
                    !isTest ?
                    <Navigation currentPath={this.props.location.pathname}/> : 
                    null
                }
                
            </div>
        )
    },
})

function chooseTemplate (children) {
    const layout = children.props.route.page.data.layout;

    if (layout === 'project') {
        return (
            <Project>
                {children}
            </Project>
        )
    }

    if (layout === 'projectList') {
        return (
            <ProjectList>
                {children}
            </ProjectList>
        )
    }

    if (layout === 'article') {
        return (
            <Article>
                {children}
            </Article>
        )
    }
    
    return children;
}