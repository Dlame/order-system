import React, { useEffect } from 'react';
import { Input, Form, Modal, message } from 'antd';
import ImageUploader from '@/components/ImageUploader';

import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

function GoodsModal(props) {
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
        logoUrl: '',
        introduce: '',
        restNum: '',
        price: '',
        shopName: '',
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
        $axios.put('/adm/token/GosGoods/update', values, { needCheck: true }).then((res) => {
          message.info(res.desc);
          console.log(res);
        });
      } else {
        $axios.post('/adm/token/GosGoods/save', values, { needCheck: true }).then((res) => {
          message.info(res.desc);
          console.log(res);
        });
      }
      props.onCancel();
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
            })(<ImageUploader onChange={setFieldsValue} />)}
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

          <Form.Item label="商家名称">
            {getFieldDecorator('shopName', {
              rules: [{ required: true, message: '请填入商家名称' }],
            })(<Input placeholder="请填入商家名称" />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Form.create()(GoodsModal);
