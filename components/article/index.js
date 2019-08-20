import React from 'react';
import classNames from 'classnames';
// import ResponsiveImage from '../ResponsiveImage';
import ImageHelmet from '../ImageHelmet';
import Footer from '../Footer';
import ScrollArrow from '../ScrollArrow';
import { filter, includes, reduce, flow, sortBy } from 'lodash';

import style from './style.module.less';

export default class Article extends React.Component {
    render() {
        console.log(this.props.data);
        // const {
        //     background,
        //     background_mobile,
        //     title,
        //     publisher,
        // } = this.props.children.props.route.page.data;

        // const { mainAddition, gallery } = this.props;

        // const currentPath = this.props.children.props.route.path;

        // const subTitle = publisher;

        // const parentPath = '/' + currentPath.split('/')[1] + '/';

        // const nextPrev = flow(
        //     pages =>
        //         filter(pages, page => {
        //             return page.path !== parentPath && includes(page.path, parentPath);
        //         }),
        //     pages =>
        //         sortBy(pages, page => {
        //             return page.data.order;
        //         }),
        //     pages =>
        //         reduce(
        //             pages,
        //             (o, page, idx) => {
        //                 if (page.path === currentPath) {
        //                     o.prev = pages[mod(idx - 1, pages.length)];
        //                     o.next = pages[(idx + 1) % pages.length];
        //                 }
        //                 return o;
        //             },
        //             {}
        //         )
        // )(this.props.children.props.route.pages);

        return (
            <article className="page">
                huhu
                {/* <header className={classNames(style.header, { [style['header--no_gallery']]: !gallery })}>
                    {background_mobile ? (
                        <div>
                            <ResponsiveImage
                                source={background_mobile}
                                location={currentPath}
                                className={classNames(style.background, style.background_mobile)}
                            />
                            <ResponsiveImage
                                source={background}
                                location={currentPath}
                                className={classNames(style.background, style.background_desktop)}
                            />
                        </div>
                    ) : (
                        <ResponsiveImage source={background} location={currentPath} className={style.background} />
                    )}
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            {subTitle ? <p className={style.sub_title}>{subTitle}</p> : null}
                            {this.props.children}
                            {mainAddition ? <div>{mainAddition}</div> : null}
                        </div>
                    </div>
                    {gallery ? <ScrollArrow className={style.scroll_hint} /> : null}
                </header>

                {gallery ? <div>{gallery}</div> : null}

                <Footer next={nextPrev.next} prev={nextPrev.prev} />
                <ImageHelmet source={background_mobile || background} location={currentPath} /> */}
            </article>
        );
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export const pageQuery = graphql`
    query PostsBySlug($slug: String!) {
        site {
            siteMetadata {
                siteTitle
                siteUrl
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                layout
                background {
                    childImageSharp {
                        resize(width: 2000) {
                            src
                        }
                        fluid(maxWidth: 3000, srcSetBreakpoints: [800, 1500, 2000, 3000]) {
                            base64
                            src
                            srcSet
                            aspectRatio
                            sizes
                        }
                    }
                }
            }
        }
    }
`;
