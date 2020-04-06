import React, { useEffect } from 'react';
import { Input, Form, Modal, message, Select } from 'antd';
import ImageUploader from '@/components/ImageUploader';

import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

function RiderModal(props) {
  const { modalType, record, visible } = props;
  const { getFieldDecorator } = props.form;
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

  // 武汉街道
  const streetList = [
    { value: 0, label: '洪山区关山街' },
    { value: 1, label: '武昌区中南路' },
    { value: 2, label: '江夏区流芳街' },
    { value: 3, label: '青山区武东街' },
    { value: 4, label: '江汉区民族街' },
    { value: 5, label: '江岸区谌家矶' },
  ];

  // 骑手状态
  const riderStatusList = [
    { value: 0, label: '等待接单' },
    { value: 1, label: '正在派送' },
    { value: 2, label: '停止接单' },
  ];
  useEffect(() => {
    if (modalType === '编辑') {
      let initValue = {};
      for (const key in record) {
        initValue[key] = {
          value: record[key],
        };
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
        $axios.put('/adm/token/GosRider/update', values, { needCheck: true }).then((res) => {
          message.info(res.desc);
          console.log(res);
        });
      } else {
        $axios.post('/adm/token/GosRider/save', values, { needCheck: true }).then((res) => {
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
        visible={visible}
        onOk={(e) => onCreate(e)}
        onCancel={() => props.onCancel()}
        okText={modalType}
        cancelText="取消"
      >
        <Form {...formItemLayout}>
          {modalType === '编辑' && (
            <Form.Item label="商品ID">{getFieldDecorator('id')(<Input disabled />)}</Form.Item>
          )}
          <Form.Item label="骑手姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填入骑手姓名' }],
            })(<Input placeholder="请输入骑手姓名" />)}
          </Form.Item>
          <Form.Item label="登陆邮箱">
            {getFieldDecorator('loginEmail', {
              rules: [
                { required: true, message: '请填入登陆邮箱' },
                { type: 'email', message: '请输入正确邮箱' },
              ],
            })(<Input placeholder="请输入登陆邮箱" />)}
          </Form.Item>
          <Form.Item label="手机号码">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请填入手机号码' }],
            })(<Input placeholder="请输入手机号码" />)}
          </Form.Item>
          <Form.Item label="骑手头像">
            {getFieldDecorator('headUrl', {
              rules: [{ required: true, message: '请填入骑手头像' }],
            })(<ImageUploader />)}
          </Form.Item>
          <Form.Item label="历史接单量">
            {getFieldDecorator('historyOrders', {
              rules: [{ required: true, message: '请填入历史接单量' }],
            })(<Input placeholder="请输入历史接单量" />)}
          </Form.Item>
          <Form.Item label="历史接单收益">
            {getFieldDecorator('historyIncome', {
              rules: [{ required: true, message: '请填入历史接单收益' }],
            })(<Input placeholder="请输入历史接单收益" />)}
          </Form.Item>
          <Form.Item label="管辖街道">
            {getFieldDecorator('addressStreet', {
              rules: [{ required: true, message: '请填入历史管辖街道' }],
            })(
              <Select style={{ width: 200 }} allowClear>
                {streetList.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="骑手状态">
            {getFieldDecorator('riderStatus', {
              rules: [{ required: true, message: '请填入历史骑手状态' }],
            })(
              <Select style={{ width: 200 }} allowClear>
                {riderStatusList.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {modalType === '编辑' && (
            <>
              <Form.Item label="创建时间">
                {getFieldDecorator('createTime')(<Input disabled />)}
              </Form.Item>
              <Form.Item label="修改时间">
                {getFieldDecorator('updateTime')(<Input disabled />)}
              </Form.Item>
            </>
          )}
          <Form.Item label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Form.create()(RiderModal);