import React from 'react';
import Article from '../Article';

export default function ({
    data: {
        contentfulShopItem: { title, price, childContentfulShopItemDescriptionTextNode, og_image, images },
    },
    pageContext,
    path,
}) {
    // console.log(images && images[0], pageContext, path);
    return (
        <Article
            title={title}
            og_image={og_image && og_image[0] && og_image[0]?.fixed?.src}
            background={images && images[0]}
            images={images}
            layout="article"
        >
            <p>price: {price}</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: childContentfulShopItemDescriptionTextNode?.childMarkdownRemark?.html,
                }}
            />
        </Article>
    );
}

export const pageQuery = graphql`
    query ShopItemsById($id: String!) {
        contentfulShopItem(id: { eq: $id }) {
            price
            title
            childContentfulShopItemDescriptionTextNode {
                childMarkdownRemark {
                    html
                }
            }
            og_image: images {
                fixed(width: 1000) {
                    src
                }
            }
            images {
                fluid(maxWidth: 3000) {
                    src
                    srcSet
                    sizes
                    aspectRatio
                }
            }
        }
    }
`;
