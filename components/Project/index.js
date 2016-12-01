import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Article from 'components/Article'
import { map, filter, includes } from 'lodash'
import ResponsiveImage from 'components/ResponsiveImage' 

import style from './style.module.less'

export default class Project extends React.Component {
    render () {
        const images = this.props.children.props.route.page.data.images
        const currentPath = this.props.children.props.route.path
        const parentPath = '/' + currentPath.split('/')[1] + '/'
        let nextPrev = {}

        const siblingPages = filter(this.props.children.props.route.pages, (page) => {
            return page.path !== parentPath &&
                includes(page.path, parentPath)
        })

        siblingPages.forEach((page, index) => {
            if (page.path === currentPath) {
                nextPrev.prev = siblingPages[mod((index - 1), siblingPages.length)]
                nextPrev.next = siblingPages[(index + 1) % siblingPages.length]
                return false;
            }
        })

        const gallery = (
            <ul className={style.gallery}>
                { map(images, (image, idx) => Image(image, idx, currentPath)) }
                { nextPrev.next ? 
                    <NextPrev {...nextPrev} /> : null 
                }
            </ul>
        )

        return (
            <Article gallery={gallery}>
                {this.props.children}
            </Article>
        )
    }
}

function Image (image, idx, currentPath) {
    return (
        <li className={style.imageContainer} key={idx}>
            <ResponsiveImage 
                source={image.src}
                location={ currentPath } 
                className={ style.image } />
        </li>
    )
}

function NextPrev ({ next, prev }) {
    return (
        <div className={style.nextPrev}>
            <Link to={prev.path} className={style.nextPrev_link}>
                <div className={style.nextPrev_label}>
                    vorheriges
                </div>            
                <div className={style.nextPrev_title}>
                    {prev.data.title}
                </div>
            </Link>
            <Link to={next.path} className={style.nextPrev_link}>
                <div className={style.nextPrev_label}>
                    nächstes
                </div>     
                <div className={style.nextPrev_title}>
                    {next.data.title}
                </div>
            </Link>
        </div>
    )
}

function mod(n, m) {
        return ((n % m) + m) % m;
}