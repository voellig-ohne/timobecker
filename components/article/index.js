import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

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

        const backgroundImage = background + '.jpg'

        return (
            <article className="page">
                <header className={style.header}>
                    <img src={backgroundImage} className={style.background}/>
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
                    { gallery ? 
                        <div>
                            { gallery }
                        </div> : null
                    }
                </header>
            </article>
        )
    }
}
