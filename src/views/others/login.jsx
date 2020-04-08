import React from 'react';
import { withRouter } from 'react-router';
import { Form, Icon, Input, Button } from 'antd';

// redux
import { login } from '@/redux/admin/actions';
import { useDispatch } from 'react-redux';

import md5 from 'md5';

import { BLOG_NAME } from '@/config';

function Login(props) {
	const dispatch = useDispatch();
	const { getFieldDecorator } = props.form;

	function handleSubmit(e) {
		e.preventDefault();
		props.form.validateFieldsAndScroll((errors, values) => {
			if (errors) return;
			let param = values;
			param.password = md5(values.password);
			dispatch(
				login(param, () => {
					props.history.push('/admin');
				})
			);
		});
	}

	return (
		<div className="login">
			<div className="login-form">
				<div className="login-logo">
					<span>{BLOG_NAME}管理后台</span>
				</div>
				<Form style={{ maxWidth: '300px' }}>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名!' }]
						})(
							<Input
								prefix={<Icon type="user" style={{ fontSize: 13 }} />}
								placeholder="请输入用户名"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }]
						})(
							<Input
								prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
								type="password"
								placeholder="请输入密码"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							style={{ width: '100%' }}
							onClick={handleSubmit}
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default withRouter(Form.create()(Login));
