import React from 'react';
import { Link } from 'gatsby';
import Article from '../Article';
import { filter, includes, flow, map, sortBy } from 'lodash';
import ResponsiveImage from '../ResponsiveImage';
import classNames from 'classnames';

import style from './style.module.less';

export default class ProjectList extends React.Component {
    render() {
        const currentPath = this.props.children.props.route.path;
        const pages = this.props.children.props.route.pages;

        const projects = flow(
            pages => filter(pages, page => isProject(page, currentPath)),
            pages => sortBy(pages, page => page.data.order),
            pages => map(pages, Project)
        )(pages);

        const mainAdditions = <div>{projects}</div>;

        return <Article mainAddition={mainAdditions}>{this.props.children}</Article>;
    }
}

function isProject(page, currentPath) {
    return page.path !== currentPath && includes(page.path, currentPath);
}

function Project(project) {
    const { path } = project;
    const imageProps = {
        source: project.data.thumbnail || project.data.background,
        location: path,
        className: classNames(style.projectImage, {
            [style.projectImage__topAlgin]: project.data.thumbnailTopAlign,
        }),
    };

    return (
        <Link to={path} key={path} className={style.projectLink}>
            {project.data.title}
            <div className={style.projectImage_container}>
                <ResponsiveImage {...imageProps} />
            </div>
        </Link>
    );
}
