import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Dropdown, Menu, Input } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import { useHistory } from 'react-router-dom';

import navList from '../navList';
import { BLOG_NAME } from '@/config';

const HeaderLeft = (props) => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  function handleChange(e) {
    e.preventDefault();
    setKeyword(e.target.value);
  }

  function onPressEnter(e) {
    e.target.blur();
  }

  function onSubmit() {
    history.push(`/?page=1&keyword=${keyword}`);
    setKeyword('');
  }

  function clickSearch(e) {
    e.stopPropagation();
  }

  const menu = (
    <Menu>
      {navList.map((nav) => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
            <span className="nav-text">{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key={'search'}>
        <Icon type="search" />
        <Input
          className="search-input"
          onClick={clickSearch}
          value={keyword}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-left">
      <SvgIcon
        type="icon-xingqiu"
        style={{ color: '#055796', width: 16, height: 16, transform: 'translateY(-2px)' }}
      />
      <span className="blog-name">{BLOG_NAME}</span>
      <Dropdown
        overlayClassName="header-dropdown"
        trigger={['click']}
        overlay={menu}
        getPopupContainer={() => document.querySelector('.app-header .header-left')}
      >
        <Icon type="menu-o" className="header-dropdown-icon" />
      </Dropdown>
    </div>
  );
};

export default HeaderLeft;
