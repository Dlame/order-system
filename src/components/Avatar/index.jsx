import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

// components
import Href from '../Href';
import { Avatar, Popover, Icon, Typography } from 'antd';
import SvgIcon from '../SvgIcon';

const { Text } = Typography;

const AvatarComponent = ({ username, github, role }) => {
  let avatarSrc = '';
  if (github && github.avatar_url) avatarSrc = github.avatar_url;
  return <Avatar src={avatarSrc}>{username}</Avatar>;
};

const AppAvatar = props => {
  const { role, username, github } = props.userInfo;
  if (!github || !props.popoverVisible) {
    return <AvatarComponent role={role} github={github} username={username} />;
  }
  return (
    <Popover
      arrowPointAtCenter
      overlayClassName="avatar-popover"
      trigger="hover"
      // placement='right'
      placement="topLeft"
      titie={
        github.bio && (
          <>
            <Icon type="github" className="mr10" />
            {github.bio}
          </>
        )
      }
      content={
        <div className="popover-content">
          <Href href={github.html_url} className="popover-cotent-avatar">
            <AvatarComponent role={role} github={github} />
          </Href>
          <ul className="github-info">
            <li>
              {github.name ? (
                <>
                  <span className="github-name"> {github.name}</span>
                  <Text type="secondary">{github.login}</Text>
                </>
              ) : (
                <span className="github-name"> {github.login}</span>
              )}
              {github.blog && (
                <li>
                  <Href href={github.blog}>
                    <SvgIcon type="iconblog2" className="mr10" />
                    <span>{github.blog}</span>
                  </Href>
                </li>
              )}
              {github.location && (
                <li>
                  <SvgIcon type="iconlocation" className="mr10" />
                  {github.location}
                </li>
              )}
            </li>
          </ul>
        </div>
      }
    >
      <AvatarComponent role={role} github={github} username={username} />
      <span />
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
