import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import ImageUploader from '@/components/ImageUploader';

// redux
import { login, register } from '@/redux/user/actions';
import { useDispatch } from 'react-redux';

// hooks
import { useListener } from '@/hooks/useBus';

import { $axios } from '@/utils/interceptor';

const FormItem = Form.Item;

const FormItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 }
	}
};

// function FormItem(props) {
// 	const { children, ...rest } = props;
// 	return (
// 		<Form.Item {...FormItemLayout} {...rest}>
// 			{children}
// 		</Form.Item>
// 	);
// }

function SignModal(props) {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState('login');
	const [loading, setLiading] = useState(false);
	const { getFieldDecorator } = props.form;

	useListener('openSignModal', type => {
		props.form.resetFields();
		setType(type);
		setVisible(true);
	});

	function handleSubmit(e) {
		e.preventDefault();
		props.form.validateFieldsAndScroll((errors, values) => {
			if (errors) return;
			let param = values;
			console.log(param);
			const action = type === 'login' ? login : register;
			dispatch(action(param)).then(() => {
				setVisible(false); // type =  login | register
			});
		});
	}

	function getAuthCode(value) {
		setLiading(true);
		$axios
			.post('/api/sendLoginMail', { to: value })
			.then(res => {
				message.success('发送成功');
				setLiading(false);
			})
			.catch(err => {
				setLiading(false);
			});
	}

	return (
		<Modal
			width={460}
			title={type}
			visible={visible}
			onCancel={e => setVisible(false)}
			footer={null}
		>
			<Form>
				{type === 'login' ? (
					<>
						<FormItem label="邮箱">
							{getFieldDecorator('loginEmail', {
								rules: [
									{ required: true, message: '请输入邮箱' },
									{ type: 'email', message: '请输入正确邮箱' }
								]
							})(
								<Input.Search
									placeholder="请输入邮箱"
									enterButton="获取验证码"
									onSearch={value => getAuthCode(value)}
									loading={loading}
								/>
							)}
						</FormItem>
						<FormItem label="验证码">
							{getFieldDecorator('code', {
								rules: [{ required: true, message: '请输入验证码' }]
							})(<Input placeholder="请输入验证码" />)}
						</FormItem>
					</>
				) : (
					<>
						<>
							<FormItem label="用户名">
								{getFieldDecorator('name', {
									rules: [{ required: true, message: '请输入用户名' }]
								})(<Input placeholder="请输入用户名" />)}
							</FormItem>
							<Form.Item label="用户头像">
								{getFieldDecorator('headUrl', {
									rules: [{ required: true, message: '请上传商品图片' }]
								})(<ImageUploader />)}
							</Form.Item>
							<FormItem label="手机号码">
								{getFieldDecorator('phone', {
									rules: [{ required: true, message: '请输入手机号码' }]
								})(<Input placeholder="请输入手机号码" />)}
							</FormItem>
							<FormItem label="邮箱">
								{getFieldDecorator('loginEmail', {
									rules: [
										{ required: true, message: '请输入邮箱' },
										{ type: 'email', message: '请输入正确邮箱' }
									]
								})(
									<Input.Search
										placeholder="请输入邮箱"
										enterButton="获取验证码"
										onSearch={value => getAuthCode(value)}
										loading={loading}
									/>
								)}
							</FormItem>
							<FormItem label="验证码">
								{getFieldDecorator('code', {
									rules: [{ required: true, message: '请输入验证码' }]
								})(<Input placeholder="请输入验证码" />)}
							</FormItem>
						</>
					</>
				)}
			</Form>
			<Button type="primary" block onClick={handleSubmit}>
				{type}
			</Button>
		</Modal>
	);
}

export default Form.create()(SignModal);
