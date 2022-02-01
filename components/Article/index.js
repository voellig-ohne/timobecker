import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import Footer from '../Footer';
import ScrollArrow from '../ScrollArrow';
import Gallery from '../Gallery';
import Navigation from '../Navigation';
import Intro from '../Intro';

import '../style/main.less';
import * as style from './style.module.less';
import ShopItemList from '../ShopItemList';
// import { graphql, useStaticQuery } from 'gatsby';

export default function ({
    pageContext,
    path,
    children,
    title,
    layout,
    og_image,
    background,
    background_mobile,
    backgroundVideo,
    images,
    shopItems,
}) {
    // const items = useStaticQuery(graphql`
    //     query MyQuery {
    //         allContentfulShopItem {
    //             edges {
    //                 node {
    //                     price
    //                     title
    //                 }
    //             }
    //         }
    //     }
    // `);

    // console.log(items);

    const staticPageData = {
        site: {
            siteMetadata: {
                siteTitle: 'Timo Becker',
            },
        },
    };

    const { siteTitle, siteDescription, siteUrl } = staticPageData.site.siteMetadata;
    const { next, previous } = pageContext || {};
    const hasGallery = !!(images && images.length);

    const metaTags = [
        { name: 'description', content: siteDescription },
        { property: 'og:description', content: siteDescription },
        { property: 'og:url', content: siteUrl + path },
    ];

    if (og_image) {
        metaTags.push({
            property: 'og:image',
            content: og_image,
        });
    }

    return (
        <>
            {{
                intro: (
                    <>
                        <Intro /> <Navigation currentPath={path} />
                    </>
                ),
                shop: (
                    <article className="page">
                        <ShopItemList items={shopItems} title={title} children={children} />
                    </article>
                ),
                article: (
                    <>
                        <article className="page">
                            <header className={classNames(style.header)}>
                                {background_mobile ? (
                                    <div>
                                        <img
                                            loading="eager"
                                            className={classNames(style.background, style.background_mobile)}
                                            alt=""
                                            {...background_mobile.fluid}
                                        />
                                        <img
                                            loading="eager"
                                            className={classNames(style.background, style.background_desktop)}
                                            alt=""
                                            {...background.fluid}
                                        />
                                    </div>
                                ) : (
                                    background && (
                                        <img
                                            loading="eager"
                                            alt=""
                                            className={style.background}
                                            {...background.fluid}
                                        />
                                    )
                                )}
                                {backgroundVideo && (
                                    <video // eslint-disable-line jsx-a11y/media-has-caption
                                        autoPlay
                                        loop
                                        muted
                                        className={classNames(style.background, style.background_desktop)}
                                        aria-hidden="true"
                                    >
                                        <source src={backgroundVideo} type="video/mp4" />
                                    </video>
                                )}
                                <div className={style.text}>
                                    <div className={style.main}>
                                        <h1>{title}</h1>
                                        {children}
                                    </div>
                                </div>
                                {hasGallery && <ScrollArrow className={style.scroll_hint} />}
                            </header>
                            {hasGallery && <Gallery images={images} />}
                            <Footer next={next} prev={previous} />
                        </article>
                        <Navigation currentPath={path} />
                    </>
                ),
            }[layout] || <article className="page">{children}</article>}
            <Helmet meta={metaTags} title={`${siteTitle} • ${title}`}>
                <html lang="en" />
                <link rel="shortcut icon" type="image/png" href="/favicon.png" />
            </Helmet>
        </>
    );
}
