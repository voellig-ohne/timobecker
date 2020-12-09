const Promise = require('bluebird');
const webpack = require('webpack');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { slugify } = require('./components/util');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return new Promise((resolve, reject) => {
        const FilePage = path.resolve('./components/FilePage/index.js');
        const ShopItemPage = path.resolve('./components/ShopItemPage/index.js');

        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(
                            filter: { fields: { slug: { ne: null } } }
                            sort: { fields: [frontmatter___order], order: ASC }
                            limit: 1000
                        ) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                    frontmatter {
                                        title
                                        order
                                        background {
                                            childImageSharp {
                                                resize(width: 700) {
                                                    src
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        allContentfulShopItem {
                            edges {
                                node {
                                    id
                                    title
                                    description {
                                        childMarkdownRemark {
                                            html
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            ).then((result) => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const posts = result.data.allMarkdownRemark.edges;

                const postsSplit = posts.reduce((postsSplit, post) => {
                    const pathSplit = post.node.fields.slug.split('/');
                    const parent = pathSplit[pathSplit.length - 3];

                    if (!postsSplit[parent]) {
                        postsSplit[parent] = [];
                    }
                    postsSplit[parent].push(post);

                    return postsSplit;
                }, {});

                Object.entries(postsSplit).forEach(([, posts]) => {
                    posts.forEach((post, index) => {
                        const shouldHaveNextPrevious = post.node.fields.slug.split('/').length === 4;
                        const next = shouldHaveNextPrevious
                            ? index === posts.length - 1
                                ? null
                                : posts[index + 1].node
                            : null;
                        const previous = shouldHaveNextPrevious ? (index === 0 ? null : posts[index - 1].node) : null;

                        createPage({
                            path: post.node.fields.slug,
                            component: FilePage,
                            context: {
                                slug: post.node.fields.slug,
                                previous,
                                next,
                            },
                        });
                    });
                });

                result.data.allContentfulShopItem.edges.forEach(({ node }) => {
                    createPage({
                        path: slugify(node.title),
                        component: ShopItemPage,
                        context: {
                            id: node.id,
                        },
                    });
                });
            })
        );
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark' && node.fileAbsolutePath) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: 'slug',
            node,
            value,
        });
    }
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    type: 'javascript/auto',
                    test: /\.json$/,
                    include: [path.resolve(__dirname, 'components/logo/paintingsSingle')],
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    STATIC: stage === 'build-html',
                },
            }),
        ],
    });
};
