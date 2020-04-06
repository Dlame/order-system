import React, { useEffect } from 'react';
import { Input, Form, Modal } from 'antd';
import ImageUploader from '@/components/ImageUploader';

import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

function GoodsModal(props) {
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
      console.log(values);
      $axios.put('/adm/token/GosUser/update', values, { needCheck: true }).then((res) => {
        console.log(res);
      });
    });
  }

  return (
    <>
      <Modal
        width={860}
        title={`${modalType}商品`}
        visible={visible}
        onOk={(e) => onCreate(e)}
        onCancel={(e) => props.onCancel()}
        okText={modalType}
        cancelText="取消"
      >
        <Form {...formItemLayout}>
          {modalType === '编辑' && (
            <Form.Item label="商品ID">{getFieldDecorator('id')(<Input disabled />)}</Form.Item>
          )}
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填入商品名称' }],
            })(<Input placeholder="请填入商品名称" />)}
          </Form.Item>
          <Form.Item label="商品图片">
            {getFieldDecorator('logoUrl', {
              rules: [{ required: true, message: '请上传商品图片' }],
            })(<ImageUploader />)}
          </Form.Item>
          <Form.Item label="商品简介">
            {getFieldDecorator('introduce', {
              rules: [{ required: true, message: '请填入商品简介' }],
            })(<Input placeholder="请填入商品简介" />)}
          </Form.Item>
          <Form.Item label="商品数量">
            {getFieldDecorator('restNum', {
              rules: [{ required: true, message: '请填入商品数量' }],
            })(<Input placeholder="请填入商品数量" />)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              rules: [{ required: true, message: '请填入商品价格' }],
            })(<Input placeholder="请填入商品价格" />)}
          </Form.Item>
          <Form.Item label="商品销量">
            {getFieldDecorator('costs', {
              rules: [{ required: true, message: '请填入商品销量' }],
            })(<Input placeholder="请填入商品销量" />)}
          </Form.Item>
          <Form.Item label="商家名称">
            {getFieldDecorator('shopName', {
              rules: [{ required: true, message: '请填入商家名称' }],
            })(<Input placeholder="请填入商家名称" />)}
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

export default Form.create()(GoodsModal);
