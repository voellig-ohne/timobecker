import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Article from 'components/Article';
import { map } from 'lodash';
import ResponsiveImage from 'components/ResponsiveImage';

import style from './style.module.less';

export default class Project extends React.Component {
    render() {
        const images = this.props.children.props.route.page.data.images;
        const currentPath = this.props.children.props.route.path;

        const gallery = (
            <ul className={style.gallery}>
                {map(images, (image, idx) => Image(image, idx, currentPath))}
            </ul>
        );

        return (
            <Article gallery={gallery}>
                {this.props.children}
            </Article>
        );
    }
}

function Image(image, idx, currentPath) {
    return (
        <li className={style.imageContainer} key={idx}>
            <ResponsiveImage source={image.src} location={currentPath} className={style.image} />
        </li>
    );
}
