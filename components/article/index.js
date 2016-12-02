import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import classNames from 'classnames'
import ResponsiveImage from 'components/ResponsiveImage' 
import Footer from 'components/Footer' 
import { filter, includes } from 'lodash'

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
                </header>

                { gallery ? 
                    <div>
                        { gallery }
                    </div> : null
                }

                <Footer next={nextPrev.next} prev={nextPrev.prev} />
            </article>
        )
    }
}

function mod(n, m) {
        return ((n % m) + m) % m;
}