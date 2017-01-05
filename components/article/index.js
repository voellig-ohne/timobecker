import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'
import ResponsiveImage from 'components/ResponsiveImage' 
import ImageHelmet from 'components/ImageHelmet' 
import Footer from 'components/Footer' 
import ScrollArrow from 'components/ScrollArrow' 
import { filter, includes, reduce, flow, sortBy } from 'lodash'

import style from './style.module.less'

export default class Article extends React.Component {
    render () {
        const { 
            background, 
            title, 
            publisher,
            descriptionSecondary
        } = this.props.children.props.route.page.data

        const {
            mainAddition,
            gallery
        } = this.props

        const backgroundImage = background
        const currentPath = this.props.children.props.route.path

        const subTitle = publisher

        const parentPath = '/' + currentPath.split('/')[1] + '/'

        const nextPrev = flow(
            pages => filter(pages, page => {
                return page.path !== parentPath &&
                    includes(page.path, parentPath)
            }),
            pages => sortBy(pages, page => {
                return page.data.order
            }),
            pages => reduce(pages, (o, page, idx) => {
                if (page.path === currentPath) {
                    o.prev = pages[mod((idx - 1), pages.length)]
                    o.next = pages[(idx + 1) % pages.length]
                }
                return o
            }, {})
        )(this.props.children.props.route.pages)

        return (
            <article className="page">
                <header className={classNames(style.header, {[style['header--no_gallery']]: !gallery})}>
                    <ResponsiveImage source={backgroundImage} location={currentPath} className={style.background}/>
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            { subTitle ?
                                <p className={style.sub_title}>
                                    { subTitle } 
                                </p> : null
                            }
                            { this.props.children }
                            { mainAddition ? 
                                <div>
                                    { mainAddition }
                                </div> : null
                            }
                        </div>
                    </div>
                    { gallery ? 
                        <ScrollArrow className={style.scroll_hint} />
                        : null
                    }
                </header>

                { gallery ? 
                    <div>
                        { gallery }
                    </div> : null
                }

                <Footer next={nextPrev.next} prev={nextPrev.prev} />
                <ImageHelmet source={backgroundImage} location={currentPath} />
            </article>
        )
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}