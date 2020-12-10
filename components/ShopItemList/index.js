import { Link } from 'gatsby';
import React from 'react';
import { slugify } from '../util';
import style from './style.module.less';
import Img from 'gatsby-image';

export default function ({ items, title, children }) {
    console.log('items!', items);
    return (
        <div className={style.container}>
            <div className={style.inner}>
                <h1 className={style.title}>{title}</h1>
                <ul className={style.list}>
                    {items.map(({ node: { id, title, images, price } }) => {
                        return (
                            <li key={id} className={style.item}>
                                <Link to={`/shop/${slugify(title)}`} className={style.link}>
                                    <h2 className={style.itemTitle}>{title}</h2>
                                    {price && <div className={style.price}>{price}€</div>}
                                    <Img loading="eager" alt="" className={style.image} {...images[0]} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
