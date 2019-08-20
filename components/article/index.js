import React from 'react';
import classNames from 'classnames';
// import ResponsiveImage from '../ResponsiveImage';
import ImageHelmet from '../ImageHelmet';
import Footer from '../Footer';
import ScrollArrow from '../ScrollArrow';
import { filter, includes, reduce, flow, sortBy } from 'lodash';

import '../style/main.less';
import style from './style.module.less';

export default class Article extends React.Component {
    render() {
        console.log(this.props);
        const { title, publisher } = this.props.data.markdownRemark.frontmatter;
        const { html, next, previous } = this.props.pageContext;

        // const {
        //     background,
        //     background_mobile,
        //     title,
        //     publisher,
        // } = this.props.children.props.route.page.data;

        // const { mainAddition, gallery } = this.props;

        // const currentPath = this.props.children.props.route.path;

        return (
            <article className="page">
                {/* <header className={classNames(style.header, { [style['header--no_gallery']]: !gallery })}> */}
                <header className={classNames(style.header)}>
                    {/* {background_mobile ? (
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
                    )} */}
                    <div className={style.text}>
                        <div className={style.main}>
                            <h1>{title}</h1>
                            {publisher ? <p className={style.sub_title}>{publisher}</p> : null}
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                            {/* {mainAddition ? <div>{mainAddition}</div> : null} */}
                        </div>
                    </div>
                    {/* {gallery ? <ScrollArrow className={style.scroll_hint} /> : null} */}
                </header>
                {/* {gallery ? <div>{gallery}</div> : null} */}
                <Footer next={next} prev={previous} />
                {/* <ImageHelmet source={background_mobile || background} location={currentPath} /> */}
            </article>
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
            }
        }
    }
`;
