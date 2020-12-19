import { Link } from 'gatsby';
import React from 'react';
import { slugify } from '../util';
import style from './style.module.less';
import Img from 'gatsby-image';
import PlainPage from '../PlainPage';

export default function ({ items, title, children }) {
    return (
        <PlainPage title={title}>
            <ul className={style.list}>
                {items.map(({ node: { id, title, images, price, subTitle } }) => {
                    return (
                        <li key={id} className={style.item}>
                            <Link to={`/shop/${slugify(title)}`} className={style.link}>
                                <div className={style.itemHeader}>
                                    <div className={style.itemHeaderInner}>
                                        <div>
                                            <h2 className={style.itemTitle}>{title}</h2>
                                            {subTitle && <p className={style.itemSubTitle}>{subTitle}</p>}
                                        </div>
                                        {price && <div className={style.price}>{price}€</div>}
                                    </div>
                                </div>
                                <Img loading="eager" alt="" className={style.image} {...images[0]} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </PlainPage>
    );
}
