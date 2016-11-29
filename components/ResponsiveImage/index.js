import React from 'react'

export default class ResponsiveImage extends React.Component {
    render () {
        const { source, location, alt, className } = this.props

        if (process.env.NODE_ENV !== 'production') {
            const path = location + source + '.jpg'
            return (
                <img src={path} className={className} alt={alt} />
            )
        } else {
            const path = location.substr(1)

            const size2 = require('!file!scale?size=1000!../.././pages/' + path + source + '.jpg')
            const size3 = require('!file!scale?size=1500!../.././pages/' + path + source + '.jpg')
            const size4 = require('!file!scale?size=2000!../.././pages/' + path + source + '.jpg')
            const size5 = require('!file!scale?size=2500!../.././pages/' + path + source + '.jpg')
            const size6 = require('!file!scale?size=3000!../.././pages/' + path + source + '.jpg')

            const srcSet = size2 + ' 1000w, ' + size3 + ' 1500w, ' + size4 + ' 2000w, ' + size5 + ' 2500w, ' + size6 + ' 3000w'

            return (
                <img src={size2}
                        srcSet={srcSet}
                        alt={alt}
                        className={className}/>
            )
        }
    }
}
