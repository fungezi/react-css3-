import React from 'react';
import classNames from 'classnames';
import tagStyles from 'public/tag.scss';

function Tag({ col, name, href }) {
  return <a className={classNames(tagStyles.tag, tagStyles[col])} href={href}>{name}</a>;
}

Tag.propTypes = {
  col: React.PropTypes.string,
  name: React.PropTypes.string,
  href: React.PropTypes.string,
};

export default Tag;
