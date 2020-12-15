import React from 'react';
import style from './style.module.less';

export default function ({ children, title }) {
    return (
        <div className={style.container}>
            <div className={style.inner}>
                <h1 className={style.title}>{title}</h1>
                {children}
            </div>
        </div>
    );
}
