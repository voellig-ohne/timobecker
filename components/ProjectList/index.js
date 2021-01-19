import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';

import style from './style.module.less';

export default function ProjectList({ projects }) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <>
            {projects.map(project => (
                <Project key={project.node.fields.slug} project={project} />
            ))}
        </>
    );
}

function Project({ project }) {
    const frontmatter = project.node.frontmatter;

    const imageProps = {
        fluid: frontmatter.thumbnail.childImageSharp.fluid || frontmatter.background.childImageSharp.fluid,
        className: classNames(style.projectImage, {
            [style.projectImage__topAlgin]: frontmatter.thumbnailTopAlign,
        }),
    };

    return (
        <Link to={project.node.fields.slug} className={style.projectLink}>
            {frontmatter.title}
            <div className={style.projectImage_container}>
                <Img {...imageProps} />
            </div>
        </Link>
    );
}
