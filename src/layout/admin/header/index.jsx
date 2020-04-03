import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { loginout } from '@/redux/user/actions';

import { Icon, Dropdown, Menu } from 'antd';

function AdminHeader(props) {
	const dispatch = useDispatch();
	const history = useHistory();

	// const userInfo = useSelector(state => state.user);

	const menu = (
		<Menu className="menu">
			<Menu.Item>
				<span onClick={() => history.push('/')}>返回首页</span>
			</Menu.Item>
			<Menu.Item>
				<span
					onClick={() => {
						// dispatch(loginout());
						history.push('/');
					}}
				>
					退出登录
				</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<div>
				{/* <img src={logo} alt='pvmed' /> */}
				<span className="header-title">一品美食</span>
				<Dropdown overlay={menu} className="header-dropdown">
					<div className="ant-dropdown-link">
						{/* {userInfo.username}  */}
						<Icon type="down" />
					</div>
				</Dropdown>
			</div>
		</>
	);
}

export default AdminHeader;
