import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

// components
import { Avatar, Popover } from 'antd';

const AvatarComponent = ({ username, headUrl }) => {
  let avatarSrc = '';
  if (headUrl) avatarSrc = headUrl;
  return <Avatar src={avatarSrc}>{username}</Avatar>;
};

const AppAvatar = (props) => {
  const { name, headUrl } = props.userInfo;
  if (!headUrl || !props.popoverVisible) {
    return <AvatarComponent headUrl={headUrl} name={name} />;
  }
  return (
    <Popover
      arrowPointAtCenter
      overlayClassName="avatar-popover"
      trigger="hover"
      // placement='right'
      placement="topLeft"
      content={
        <div className="popover-content">
          <ul className="github-info">
            <li>
              <span className="github-name"> {name}</span>
            </li>
          </ul>
        </div>
      }
    >
      <AvatarComponent headUrl={headUrl} name={name} />
    </Popover>
  );
};

AppAvatar.propTypes = {
  userInfo: PropTypes.object.isRequired,
  popoverVisible: PropTypes.bool,
};

AppAvatar.defaultProps = {
  popoverVisible: true,
};

export default AppAvatar;
