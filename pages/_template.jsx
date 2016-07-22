import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Navigation from 'components/navigation'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        console.log(this.props.location.pathname)

        return (
            <div>
                <main className="main_content">
                    {this.props.children}
                </main>
                <Navigation
                    currentPath={this.props.location.pathname}/>
            </div>
        )
    },
})
