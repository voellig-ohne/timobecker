import React from 'react';
import Img from 'gatsby-image';

import style from './style.module.less';

export default function Gallery({ images }) {
    return (
        <ul className={style.gallery}>
            {images.map((image, idx) => (
                <li key={idx} className={style.imageContainer}>
                    <Img durationFadeIn={100} fluid={image.src.childImageSharp.fluid} className={style.image} />
                </li>
            ))}
        </ul>
    );
}
