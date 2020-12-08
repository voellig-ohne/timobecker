require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        siteTitle: 'Timo Becker',
        siteDescription:
            'Berlin based illustrator and designer. Gladly illustrating books, magazines and events. Also developing character and environment concepts.',
        siteUrl: 'https://timobecker.com',
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/pages`,
                name: 'pages',
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: ['gatsby-remark-copy-linked-files'],
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaultQuality: 80,
            },
        },
        {
            resolve: 'gatsby-plugin-matomo',
            options: {
                siteId: '1',
                matomoUrl: 'https://piwik.timobecker.com',
                siteUrl: 'https://timobecker.com',
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-less`,
    ],
};
