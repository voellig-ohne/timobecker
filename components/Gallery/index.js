import React, { useEffect, useState } from 'react';
import Img from 'gatsby-image';
import classNames from 'classnames';

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
                                        src={`https://www.youtube-nocookie.com/embed/${image.youtubeId}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                    {image.slideshow && <Slideshow images={image.slideshow} />}
                    {image.mp4 && (
                        <video // eslint-disable-line jsx-a11y/media-has-caption
                            autoPlay
                            loop
                            muted
                            className={classNames(style.image)}
                        >
                            <source src={image.mp4.publicURL} type="video/mp4" />
                        </video>
                    )}
                </li>
            ))}
        </ul>
    );
}

function Slideshow({ images }) {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className={style.slideshow}>
            {images.map((image, index) => {
                return (
                    <div
                        className={classNames(style.slideshowImageContainer, {
                            [style.active]: index <= currentImage,
                        })}
                    >
                        <Img
                            className={style.slideshowImage}
                            key={index}
                            loading="lazy"
                            fluid={image.childImageSharp.fluid}
                        />
                    </div>
                );
            })}
        </div>
    );
}
