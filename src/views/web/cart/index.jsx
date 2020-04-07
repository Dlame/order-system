import React, { useState } from 'react';
import './index.less';

import { Button } from 'antd';

// redux
import { useSelector } from 'react-redux';
// import { addToCart } from '@/redux/cart/action';

export function Cart(props) {
	const cart = useSelector(state => state.shoppingCart.cart);
	const img = require('../../../assets/image/timg.jpg');

	return (
		<div className="app-article">
			<div className="app-home">
				<ul className="app-home-list">
					{cart.map(item => (
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
							<div className="article-detail others"></div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Cart;
