import React, { useState } from 'react';
import './index.less';

// import { Link } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
// import { decodeQuery } from '@/utils';

// components
import { Spin, Button, Modal, InputNumber, message } from 'antd';
import Pagination from '@/components/Pagination';
import SvgIcon from '@/components/SvgIcon';

// hooks
import useFetchList from '@/hooks/useFetchList';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cart/action';

import { accMul } from '@/utils';

function Home(props) {
  const [visible, setVisible] = useState(false);
  const [goods, setGoods] = useState({});
  const [count, setCount] = useState(0);
  const userInfo = useSelector((state) => state.user);
  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/api/GosGoods/query',
    queryParams: {},
    fetchDependence: [props.location.search],
  });

  const dispatch = useDispatch(); // dispatch hooks

  // const { keyword } = decodeQuery(props.location.search);

  function showModal(goods) {
    if (!userInfo.token) {
      message.warn('请先登录后再添加');
      return;
    }
    setVisible(true);
    setGoods(goods);
  }

  function addtoCart() {
    if (count <= 0) {
      message.warn('请先选择商品数量');
      return;
    }
    let payload = { ...goods, count, amount: accMul(count, goods.price) };
    dispatch(addToCart(payload));
    setVisible(false);
    setCount(0);
    setGoods({});
  }

  const img = require('../../../assets/image/timg.jpg');

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="app-home">
        <ul className="app-home-list">
          {dataList.map((item) => (
            <li className="app-home-list-item" key={item.id}>
              <div className="article-detail img">
                <img alt={item.name} src={img} />
              </div>
              <div className="article-detail price">
                <span>￥</span>
                {item.price}
              </div>

              <div className="title">
                {item.name} <span className="posted-time">{item.shopName}</span>
              </div>
              <div
                className="article-detail content"
                dangerouslySetInnerHTML={{ __html: item.introduce }}
              ></div>
              <Button
                type="danger"
                className="list-item-others btn"
                onClick={() => showModal(item)}
              >
                加入购物车
              </Button>
            </li>
          ))}
        </ul>

        <Modal
          width={460}
          title="添加购物车"
          visible={visible}
          // onOk={e => onCreate(e)}
          onCancel={() => setVisible(false)}
          okText="确定"
          cancelText="取消"
          footer={[
            <InputNumber
              className="modal-inputnum"
              min={0}
              max={goods.restNum}
              key={new Date()}
              value={count}
              onChange={(value) => setCount(value)}
              placeholder="请选择数量"
            />,
            <Button key="back" onClick={(e) => setVisible(false)}>
              取消
            </Button>,
            <Button key="submit" type="danger" onClick={() => addtoCart()}>
              添加
            </Button>,
          ]}
        >
          <div className="modal-img">
            <img alt={goods.name} src={img} />
          </div>
          <div className="modal-price">
            <span>￥</span>
            {goods.price}
          </div>

          <div className="midal-title">
            {goods.name} <span className="posted-time">{goods.shopName}</span>
          </div>
          <div
            className="modal-content"
            dangerouslySetInnerHTML={{ __html: goods.introduce }}
          ></div>
          <div className="modal-icons">
            <SvgIcon type="icon-xiaoliang" style={{ marginRight: 5 }} />
            <span style={{ marginRight: 10 }}> 销量：{goods.costs}</span>
            <SvgIcon type="icon-kucunqingdan" style={{ marginRight: 5 }} />
            <span style={{ marginRight: 10 }}> 库存：{goods.restNum}</span>
          </div>
        </Modal>

        <Pagination
          {...pagination}
          onChange={(page) => {
            document.querySelector('.app-main').scrollTop = 0;
            pagination.onChange(page);
          }}
        />
      </div>
    </Spin>
  );
}

export default Home;
