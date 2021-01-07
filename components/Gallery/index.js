import React from 'react';
import Img from 'gatsby-image';

import style from './style.module.less';

export default function Gallery({ images }) {
    return (
        <ul className={style.gallery}>
            {images.map((image, idx) => (
                <li key={idx} className={style.imageContainer}>
                    {image.src && (
                        <Img loading="lazy" className={style.image} fluid={image.src.childImageSharp.fluid} />
                    )}
                    {image.youtubeId && (
                        <div className={style.youtubeOuter}>
                            <div className={style.youtubeInner}>
                                <div className={style.youtubeInnerInner}>
                                    <iframe
                                        title="youtube video"
                                        className={style.youtubeIFrame}
                                        width="560"
                                        height="315"
                                        src="https://www.youtube-nocookie.com/embed/SDTdLQTdOYI"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}
