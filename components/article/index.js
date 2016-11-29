import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'
import ResponsiveImage from 'components/ResponsiveImage' 

import style from './style.module.less'

export default class Article extends React.Component {
    render () {
        const { 
            background, 
            title, 
            descriptionSecondary
        } = this.props.children.props.route.page.data

        const {
            mainAddition,
            gallery
        } = this.props

        const backgroundImage = background
        const currentPath = this.props.children.props.route.path

        return (
            <article className="page">
                <header className={classNames(style.header, {[style['header--no_gallery']]: !gallery})}>
                    <ResponsiveImage source={backgroundImage} location={currentPath} className={style.background}/>
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            { this.props.children }
                            { mainAddition ? 
                                <div>
                                    { mainAddition }
                                </div> : null
                            }
                        </div>
                    </div>
                </header>

                { gallery ? 
                    <div>
                        { gallery }
                    </div> : null
                }
            </article>
        )
    }
}
