import React from 'react'
import Helmet from 'react-helmet';

export default class ImageHelmet extends React.Component {
    render () {
        const { source, location } = this.props

        if (process.env.NODE_ENV === 'production') {
            const path = location.substr(1)

            const meta = [{
                property: 'og:image',
                content: require('!file!scale?size=2000!../.././pages/' + path + source + '.jpg')
            }]

            return (
                <Helmet meta={meta} />
            )
        }

        return null;
    }
}
