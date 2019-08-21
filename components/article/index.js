import React from 'react';
import classNames from 'classnames';
import Img from 'gatsby-image';
import ImageHelmet from '../ImageHelmet';
import Footer from '../Footer';
import ScrollArrow from '../ScrollArrow';
import Gallery from '../Gallery';
import Navigation from '../Navigation';
import ProjectList from '../ProjectList';

import '../style/main.less';
import style from './style.module.less';

export default class Article extends React.Component {
    render() {
        console.log(this.props);
        const { title, publisher, background, background_mobile, images } = this.props.data.markdownRemark.frontmatter;
        const { html } = this.props.data.markdownRemark;
        const { next, previous } = this.props.pageContext;
        const children = this.props.data.children.edges;
        const hasGallery = !!(images && images.length);

        return (
            <>
                <article className="page">
                    {/* <header className={classNames(style.header, { [style['header--no_gallery']]: !gallery })}> */}
                    <header className={classNames(style.header)}>
                        {background_mobile ? (
                            <div>
                                <Img
                                    fluid={background_mobile.childImageSharp.fluid}
                                    className={classNames(style.background, style.background_mobile)}
                                />
                                <Img
                                    fluid={background.childImageSharp.fluid}
                                    className={classNames(style.background, style.background_desktop)}
                                />
                            </div>
                        ) : (
                            <Img fluid={background.childImageSharp.fluid} className={style.background} />
                        )}
                        <div className={style.text}>
                            <div className={style.main}>
                                <h1>{title}</h1>
                                {publisher ? <p className={style.sub_title}>{publisher}</p> : null}
                                <div dangerouslySetInnerHTML={{ __html: html }} />
                                <ProjectList projects={children} />
                            </div>
                        </div>
                        {hasGallery && <ScrollArrow className={style.scroll_hint} />}
                    </header>
                    {hasGallery && <Gallery images={images} />}
                    <Footer next={next} prev={previous} />
                    {/* <ImageHelmet source={background_mobile || background} location={currentPath} /> */}
                </article>
                <Navigation />
            </>
        );
    }
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
                publisher
                background {
                    childImageSharp {
                        fluid(maxWidth: 2500) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                background_mobile {
                    childImageSharp {
                        fluid(maxWidth: 2500) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                images {
                    src {
                        childImageSharp {
                            fluid(maxWidth: 2500) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        children: allMarkdownRemark(
            filter: { fields: { slug: { regex: $slug, ne: $slug } } }
            sort: { order: ASC, fields: frontmatter___order }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        thumbnailTopAlign
                        background {
                            childImageSharp {
                                fluid(maxWidth: 2500) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        thumbnail {
                            childImageSharp {
                                fluid(maxWidth: 2500) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
