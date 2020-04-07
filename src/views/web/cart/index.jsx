import React, { useState } from 'react';
import './index.less';

import {
  Button,
  InputNumber,
  Checkbox,
  Modal,
  Layout,
  Empty,
  message,
  Form,
  Select,
  Input,
} from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCart } from '@/redux/cart/action';

import { accMul } from '@/utils';
import { $axios } from '@/utils/interceptor';

// 武汉街道
const streetList = [
  { value: 0, label: '洪山区关山街' },
  { value: 1, label: '武昌区中南路' },
  { value: 2, label: '江夏区流芳街' },
  { value: 3, label: '青山区武东街' },
  { value: 4, label: '江汉区民族街' },
  { value: 5, label: '江岸区谌家矶' },
];

// 表单样式
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};

export function Cart(props) {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const img = require('../../../assets/image/timg.jpg');
  const [visible, setVisible] = useState(false);
  const [goodsList, setGoodsList] = useState([]);
  const [goodsPrice, setGoodsPrice] = useState(0);
  const { getFieldDecorator } = props.form;

  function removeGoods(id) {
    Modal.confirm({
      title: '确定删除？',
      onOk() {
        dispatch(removeFromCart(id));
      },
    });
  }

  function updateGoods(goods, count) {
    goods.count = count;
    goods.amount = accMul(count, goods.price);
    dispatch(updateCart(goods));
  }

  function onCheckboxChange(checkedValue) {
    let checkGoodsList = [];
    for (const index of checkedValue) {
      checkGoodsList.push(cart[index]);
    }
    checkGoodsList = checkGoodsList.map((v) => {
      return {
        goodsId: v.id,
        goodsNum: v.count,
        goodsPrice: v.price,
        totalPrice: v.amount,
      };
    });
    setGoodsList(checkGoodsList);
    if (checkGoodsList.length > 0) {
      setGoodsPrice(checkGoodsList.map((v) => v.totalPrice).reduce((a, b) => a + b));
    }
  }

  function onOrderClick() {
    if (goodsList.length <= 0) {
      message.warn('请先选择购买商品');
      return;
    }
    setVisible(true);
  }

  function onCreate(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      let param = values;
      param.goodsList = goodsList;
      $axios.post('/api/token/GosOrder/downOrder', param, { needCheck: true }).then((res) => {
        message.info(res.desc);
        console.log(res);
      });
    });
  }

  return (
    <div className="app-article">
      {cart.length > 0 ? (
        <Layout style={{ paddingTop: 20 }}>
          <Layout.Content>
            <div className="app-home">
              <Checkbox.Group
                style={{ width: '100%' }}
                onChange={(checkedValue) => onCheckboxChange(checkedValue)}
              >
                <ul className="app-home-list">
                  {cart.map((item, index) => (
                    <li
                      className="app-home-list-item"
                      style={{ backgroundColor: 'white' }}
                      key={item.id}
                    >
                      <div className="article-detail img">
                        <img alt={item.name} src={img} />
                      </div>
                      <div className="article-detail price">
                        <span>￥</span>
                        {item.price}
                      </div>
                      <div className="title" style={{ marginTop: 10 }}>
                        {item.name} <span className="posted-time">{item.shopName}</span>
                      </div>
                      <div
                        className="article-detail content"
                        style={{ marginTop: 10 }}
                        dangerouslySetInnerHTML={{ __html: item.introduce }}
                      ></div>
                      <div className="article-detail others" style={{ marginTop: 10 }}>
                        数量：
                        <InputNumber
                          defaultValue={item.count}
                          min={1}
                          onChange={(number) => updateGoods(item, number)}
                        />
                      </div>
                      <div style={{ marginTop: 10 }}>总价：{item.amount}元</div>
                      <Checkbox style={{ marginTop: 10 }} value={index}>
                        购买
                      </Checkbox>
                      <Button
                        type="danger"
                        style={{ float: 'right' }}
                        onClick={() => removeGoods(item.id)}
                      >
                        删除
                      </Button>
                    </li>
                  ))}
                </ul>
              </Checkbox.Group>
            </div>
          </Layout.Content>
          <Layout.Footer>
            <Button
              type="primary"
              icon="pay-circle"
              shape="round"
              size="large"
              onClick={() => onOrderClick()}
            >
              购买
            </Button>
          </Layout.Footer>
        </Layout>
      ) : (
        <Empty />
      )}
      <Modal
        width={560}
        title="下单"
        visible={visible}
        onOk={(e) => onCreate(e)}
        onCancel={() => setVisible(false)}
        okText="下单"
        cancelText="取消"
      >
        <Form {...formItemLayout}>
          <Form.Item label="订单总价">
            {getFieldDecorator('goodsPrice', {
              initialValue: goodsPrice,
            })(<Input disabled addonAfter="元" />)}
          </Form.Item>
          <Form.Item label="配送街道">
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
          <Form.Item label="详细地址">
            {getFieldDecorator('addressDetail', {
              rules: [{ required: true, message: '请填入详细地址' }],
            })(<Input placeholder="请输入详细地址" />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(Cart);
