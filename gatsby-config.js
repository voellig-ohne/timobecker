module.exports = {
    siteMetadata: {
        siteTitle: 'Timo Becker',
        siteDescription:
            'Berlin based illustrator and designer. Gladly illustrating books, magazines and events. Also developing character and environment concepts.',
        siteUrl: 'https://timobecker.com',
        linkPrefix: '/gatsby-starter-default',
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
                plugins: [
                    // {
                    //     resolve: `gatsby-remark-images`,
                    //     options: {
                    //         maxWidth: 3000,
                    //         linkImagesToOriginal: false,
                    //     },
                    // },
                    'gatsby-remark-copy-linked-files',
                    // 'gatsby-remark-smartypants',
                ],
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaultQuality: 80,
            },
        },
        // {
        //     resolve: 'gatsby-plugin-matomo',
        //     options: {
        //         siteId: '1',
        //         matomoUrl: 'https://piwik.volligohne.de',
        //         siteUrl: 'https://volligohne.de',
        //     },
        // },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-less`,
    ],
};
