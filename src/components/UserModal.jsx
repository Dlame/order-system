import React, { useEffect } from 'react';
import { Input, Form, Modal, message } from 'antd';
import ImageUploader from '@/components/ImageUploader';

import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

function CreateUser(props) {
  const { modalType, record, visible } = props;
  const { getFieldDecorator, setFieldsValue } = props.form;
  // 表单样式
  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
    },
  };

  useEffect(() => {
    if (modalType === '编辑') {
      let initValue = {
        id: '',
        name: '',
        loginEmail: '',
        phone: '',
        headUrl: '',
        remark: '',
      };
      for (const key in record) {
        if (initValue.hasOwnProperty(key)) {
          initValue[key] = {
            value: record[key],
          };
        }
      }
      props.form.setFields(initValue);
    } else {
      props.form.resetFields();
    }
  }, [visible, modalType]);

  // 编辑or新建
  function onCreate(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      if (modalType === '编辑') {
        $axios.put('/adm/token/GosUser/update', values, { needCheck: true }).then((res) => {
          message.info(res.desc);
          console.log(res);
        });
      } else {
        $axios.post('/adm/token/GosUser/save', values, { needCheck: true }).then((res) => {
          message.info(res.desc);
          console.log(res);
        });
      }
    });
  }

  return (
    <>
      <Modal
        width={860}
        title={`${modalType}用户`}
        visible={!!visible}
        onOk={(e) => onCreate(e)}
        onCancel={(e) => props.onCancel()}
        okText={modalType}
        cancelText="取消"
      >
        <Form {...formItemLayout}>
          <>
            {modalType === '编辑' && (
              <Form.Item label="用户ID">{getFieldDecorator('id')(<Input disabled />)}</Form.Item>
            )}
            <Form.Item label="用户姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填入姓名' }],
              })(<Input placeholder="请输入登录邮箱" />)}
            </Form.Item>
            <Form.Item label="登录邮箱">
              {getFieldDecorator('loginEmail', {
                rules: [
                  { required: true, message: '请填入登录邮箱' },
                  {
                    type: 'email',
                    message: '请输入正确邮箱',
                  },
                ],
              })(<Input placeholder="请输入登录邮箱" />)}
            </Form.Item>
            <Form.Item label="手机号码">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '手机号码' }],
              })(<Input placeholder="请输入密码" />)}
            </Form.Item>
            <Form.Item label="用户头像">
              {getFieldDecorator('headUrl', {
                rules: [{ required: true, message: '请上传用户头像' }],
              })(<ImageUploader onChange={setFieldsValue} />)}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}
            </Form.Item>
          </>
        </Form>
      </Modal>
    </>
  );
}

export default Form.create()(CreateUser);
