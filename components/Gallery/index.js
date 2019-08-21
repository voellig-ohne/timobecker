import React from 'react';
import Img from 'gatsby-image';

import style from './style.module.less';

export default function Gallery({ images }) {
    if (images.length === 0) {
        return null;
    }

    return (
        <ul className={style.gallery}>
            {images.map((image, idx) => (
                <li key={idx} className={style.imageContainer}>
                    <Img fluid={image.src.childImageSharp.fluid} className={style.image} />
                </li>
            ))}
        </ul>
    );
}
