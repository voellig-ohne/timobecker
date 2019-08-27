import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import Footer from '../Footer';
import ScrollArrow from '../ScrollArrow';
import Gallery from '../Gallery';
import Navigation from '../Navigation';
import ProjectList from '../ProjectList';
import Intro from '../Intro';

import '../style/main.less';
import style from './style.module.less';

export default class Article extends React.Component {
    render() {
        const {
            title,
            publisher,
            background,
            background_mobile,
            images,
            layout,
            og_image,
            badge,
        } = this.props.data.markdownRemark.frontmatter;
        const { html } = this.props.data.markdownRemark;
        const { siteTitle, siteDescription, siteUrl } = this.props.data.site.siteMetadata;
        const { next, previous } = this.props.pageContext;
        const children = this.props.data.children.edges;
        const hasGallery = !!(images && images.length);

        const metaTags = [
            { name: 'description', content: siteDescription },
            { property: 'og:description', content: siteDescription },
            { property: 'og:url', content: siteUrl + this.props.path },
        ];

        if (og_image) {
            metaTags.push({
                property: 'og:image',
                content: og_image.childImageSharp.fixed.src,
            });
        }

        return (
            <>
                {layout === 'intro' ? (
                    <Intro />
                ) : (
                    <article className="page">
                        <header className={classNames(style.header)}>
                            {background_mobile ? (
                                <div>
                                    <img
                                        loading="eager"
                                        className={classNames(style.background, style.background_mobile)}
                                        {...background_mobile.childImageSharp.fluid}
                                    />
                                    <img
                                        loading="eager"
                                        className={classNames(style.background, style.background_desktop)}
                                        {...background.childImageSharp.fluid}
                                    />
                                </div>
                            ) : (
                                background && (
                                    <img
                                        loading="eager"
                                        className={style.background}
                                        {...background.childImageSharp.fluid}
                                    />
                                )
                            )}
                            <div className={style.text}>
                                <div className={style.main}>
                                    <h1>{title}</h1>
                                    {badge && <img className={style.badge} src={badge.childImageSharp.original.src} />}
                                    {publisher ? <p className={style.sub_title}>{publisher}</p> : null}
                                    <div dangerouslySetInnerHTML={{ __html: html }} />
                                    <ProjectList projects={children} />
                                </div>
                            </div>
                            {hasGallery && <ScrollArrow className={style.scroll_hint} />}
                        </header>
                        {hasGallery && <Gallery images={images} />}
                        <Footer next={next} prev={previous} />
                    </article>
                )}
                <Navigation currentPath={this.props.path} />
                <Helmet meta={metaTags} title={`${siteTitle} • ${title}`}>
                    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
                </Helmet>
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
                siteDescription
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                layout
                publisher
                layout
                background {
                    childImageSharp {
                        fluid(maxWidth: 1500) {
                            src
                            srcSet
                        }
                    }
                }
                og_image: background {
                    childImageSharp {
                        fixed(width: 1000) {
                            src
                        }
                    }
                }
                background_mobile {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            src
                            srcSet
                        }
                    }
                }
                images {
                    src {
                        childImageSharp {
                            fluid(maxWidth: 1500) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                badge {
                    childImageSharp {
                        original {
                            src
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
                                fluid(maxWidth: 500) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        thumbnail {
                            childImageSharp {
                                fluid(maxWidth: 500) {
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
