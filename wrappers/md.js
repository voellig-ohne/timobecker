import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';

module.exports = React.createClass({
    propTypes() {
        return {
            router: React.PropTypes.object,
        };
    },
    render() {
        const post = this.props.route.page.data;

        const title = `${config.siteTitle} | ${post.title}`;

        const meta = [
            {
                property: 'og:title',
                content: title,
            },
        ];

        return (
            <div className="markdown">
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
                <Helmet title={title} meta={meta} />
            </div>
        );
    },
});
