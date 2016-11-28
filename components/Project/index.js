import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Article from 'components/Article'
import { map } from 'lodash'

import style from './style.module.less'

console.log(style)

export default class Project extends React.Component {
    render () {
        const images = this.props.children.props.route.page.data.images

        const gallery = (
            <ul className={style.gallery}>
                { map(images, Image) }
            </ul>
        )

        return (
            <Article gallery={gallery}>
                {this.props.children}
            </Article>
        )
    }
}

function Image (image, idx) {
    return (
        <li className={style.imageContainer} key={idx}>
            <img src={image.src + '.jpg'} className={style.image}/>
        </li>
    )
}