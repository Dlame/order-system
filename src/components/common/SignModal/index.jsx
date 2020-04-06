import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';

// redux
import { login, register } from '@/redux/user/actions';
import { useDispatch } from 'react-redux';

// hooks
import { useListener } from '@/hooks/useBus';

import md5 from 'md5';

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function FormItem(props) {
  const { children, ...rest } = props;
  return (
    <Form.Item {...FormItemLayout} {...rest}>
      {children}
    </Form.Item>
  );
}

function SignModal(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('login');
  const { getFieldDecorator } = props.form;

  useListener('openSignModal', (type) => {
    props.form.resetFields();
    setType(type);
    setVisible(true);
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      let param = values;
      param.password = md5(values.password);
      console.log(param);
      const action = type === 'login' ? login : register;
      dispatch(action(param)).then(() => {
        setVisible(false); // type =  login | register
      });
    });
  }

  // 输入密码
  function compareToFirstPassword(rule, value, callback) {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      onCancel={(e) => setVisible(false)}
      footer={null}
    >
      <Form layout="horizontal">
        {type === 'login' ? (
          <>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名必填' }],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码必填' }],
              })(<Input placeholder="请输入密码" type="password" />)}
            </FormItem>
          </>
        ) : (
          <>
            <>
              <FormItem label="用户名">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Username is required' }],
                })(<Input placeholder="请输入用户名" />)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password is required' }],
                })(<Input placeholder="请输入密码" type="password" />)}
              </FormItem>
              <FormItem label="确认密码">
                {getFieldDecorator('confirm', {
                  rules: [
                    { required: true, message: 'Password is required' },
                    { validator: compareToFirstPassword },
                  ],
                })(<Input placeholder="确认密码" type="password" />)}
              </FormItem>
              <FormItem label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: 'The input is not valid E-mail!' },
                    { required: true, message: 'Please input your E-mail!' },
                  ],
                })(<Input placeholder="请输入您的邮箱" />)}
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
