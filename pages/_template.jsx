import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Navigation from 'components/navigation'
import Project from 'components/Project'
import ProjectList from 'components/ProjectList'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        const post = this.props.children.props.route.page
        return (
            <div>
                <main className="main_content">
                    {
                        chooseTemplate(this.props.children)
                    }                    
                </main>
                <Navigation
                    currentPath={this.props.location.pathname}/>
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
    
    return children;
}