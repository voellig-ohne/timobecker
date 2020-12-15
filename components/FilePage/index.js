import React from 'react';
import ProjectList from '../ProjectList';
import Article from '../Article';
import style from './style.module.less';
import { graphql } from 'gatsby';

export default function ({ data, pageContext, path }) {
    const {
        title,
        publisher,
        background,
        background_mobile,
        images,
        layout,
        og_image,
        badge,
    } = data.markdownRemark.frontmatter;

    return (
        <Article
            title={title}
            layout={layout || 'article'}
            images={images}
            og_image={og_image && og_image.childImageSharp.fixed.src}
            background_mobile={background_mobile?.childImageSharp}
            background={background?.childImageSharp}
            pageContext={pageContext}
            path={path}
            shopItems={data?.shopItems?.edges}
        >
            {badge && <img className={style.badge} src={badge.childImageSharp.original.src} alt="" />}
            {publisher ? <p className={style.sub_title}>{publisher}</p> : null}
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            <ProjectList projects={data.children.edges} />
        </Article>
    );
}

export const pageQuery = graphql`
    query PostsBySlug($slug: String!) {
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
                    youtubeId
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
        shopItems: allContentfulShopItem {
            edges {
                node {
                    id
                    title
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                    price
                    images {
                        fluid(maxWidth: 500) {
                            sizes
                            src
                            srcSet
                            aspectRatio
                        }
                    }
                }
            }
        }
    }
`;
