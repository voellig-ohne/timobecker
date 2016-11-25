import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import style from './style.module.less'

export default class Article extends React.Component {
    render () {
        const { 
            background, 
            title, 
            body, 
            children, 
            descriptionSecondary 
        } = this.props

        return (
            <article className="page">
                <header className={style.header}>
                    <img src={background} className={style.background}/>
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            {body}
                        </div>
                        <div className={style.aside}>
                            {descriptionSecondary}
                        </div>
                    </div>
                </header>

                {children}
            </article>
        )
    }
}
