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

        return (
            <article className="page">
                <header className={style.header}>
                    <img src={background} className={style.background}/>
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            { this.props.children }                            
                        </div>
                        {
                            descriptionSecondary ?
                            <div className={style.aside}>
                                {descriptionSecondary}
                            </div> : null
                        }
                    </div>
                </header>
            </article>
        )
    }
}
