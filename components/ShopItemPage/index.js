import React from 'react';
import { Helmet } from 'react-helmet';
import PlainPage from '../PlainPage';
import * as style from './style.module.less';
import Img from 'gatsby-image';
import { getMailtoUrl } from '../util';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

export default function ({
    data: {
        contentfulShopItem: { title, price, childContentfulShopItemDescriptionTextNode, og_image, images, subTitle },
    },
    pageContext,
    path,
}) {
    const mailAddress =
        typeof window !== `undefined` ? ['order@timo', 'becker.com'].join('') : 'order (ät) timobecker.com';

    const metaTags = [
        { name: 'description', content: childContentfulShopItemDescriptionTextNode?.childMarkdownRemark?.excerpt },
        {
            property: 'og:description',
            content: childContentfulShopItemDescriptionTextNode?.childMarkdownRemark?.excerpt,
        },
        { property: 'og:image', content: og_image && og_image[0] && og_image[0]?.fixed?.src },
    ];

    const buyLink = getMailtoUrl({
        to: mailAddress,
        subject: `Bestellung: "${title}"`,
        body: `Hey Timo,

I would like to order "${title}".

Please send me an invoice.

My address is:`,
    });

    return (
        <PlainPage
            className={style.container}
            title={
                <div className={style.title}>
                    <div>
                        <Link className={style.backLink} to="/shop">
                            shop
                        </Link>
                        {title}
                        {subTitle && <div className={style.subTitle}>{subTitle}</div>}
                    </div>
                    {typeof window !== `undefined` && (
                        <a href={buyLink} className={style.priceLabel}>
                            <div className={style.priceLabelPrice}>{price}€</div>
                        </a>
                    )}
                </div>
            }
            htmlTitle={title}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: childContentfulShopItemDescriptionTextNode?.childMarkdownRemark?.html,
                }}
            />
            <div className={style.images}>
                {images.map(({ id, fluid }) => (
                    <Img className={style.image} key={id} fluid={fluid} />
                ))}
            </div>
            <div className={style.buyButtonContainer}>
                {typeof window !== `undefined` && (
                    <a href={buyLink} className={style.buyButton}>
                        BUY NOW!
                    </a>
                )}
                <div className={style.buyHint}>
                    If the button above does not work for you, please send me a mail with the title of the image and
                    your address to <em>{mailAddress}</em>
                </div>
            </div>

            <Helmet meta={metaTags} />
        </PlainPage>
    );
}

export const pageQuery = graphql`
    query ShopItemsById($id: String!) {
        contentfulShopItem(id: { eq: $id }) {
            price
            title
            subTitle
            childContentfulShopItemDescriptionTextNode {
                childMarkdownRemark {
                    html
                    excerpt
                }
            }
            og_image: images {
                fixed(width: 1000) {
                    src
                }
            }
            images {
                id
                fluid(maxWidth: 1000) {
                    src
                    srcSet
                    sizes
                    aspectRatio
                }
            }
        }
    }
`;
