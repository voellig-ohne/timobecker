import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import style from './style.module.less'

export default class Article extends React.Component {
    render () {
        return (
            <article className="page">
                <header className={style.header}>
                    <img src="portrait.jpg" className={style.background}/>
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{this.props.title}</h1>
                            {this.props.description}
                        </div>
                        <div className={style.aside}>
                            {this.props.descriptionSecondary}
                        </div>
                    </div>
                </header>

                {this.props.children}
            </article>
        )
    }
}
