import React from 'react';
import { Table, Popconfirm, message } from 'antd';

import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import useMount from '@/hooks/useMount';

import { useSelector } from 'react-redux';

// 武汉街道
const streetList = [
	{ value: 0, label: '洪山区关山街' },
	{ value: 1, label: '武昌区中南路' },
	{ value: 2, label: '江夏区流芳街' },
	{ value: 3, label: '青山区武东街' },
	{ value: 4, label: '江汉区民族街' },
	{ value: 5, label: '江岸区谌家矶' }
];

// 订单状态
const orderStatusList = [
	{ value: 0, label: '未付款' },
	{ value: 1, label: '正在支付' },
	{ value: 2, label: '支付成功' },
	{ value: 3, label: '正在派送' },
	{ value: 4, label: '订单完成' },
	{ value: 5, label: '支付失败' },
	{ value: 6, label: '订单取消' }
];

function RiderManage(props) {
	useBreadcrumb(['订单管理']);
	const user = useSelector(state => state.user);

	useMount(() => {
		if (!user.userId) {
			message.warn('请点击右上角登录后再查看');
			props.history.replace('/');
		}
	});

	const { tableProps, updateList } = useAntdTable({
		requestUrl: '/api/token/GosOrder/query',
		queryParams: {},
		columns: [
			{ title: '订单ID', dataIndex: 'id' },
			{ title: '用户姓名', dataIndex: 'userName' },
			{ title: '用户电话号码', dataIndex: 'userPhone' },
			{ title: '骑手姓名', dataIndex: 'riderName' },
			{ title: '骑手电话号码', dataIndex: 'riderPhone' },
			{ title: '下单时间', dataIndex: 'orderTime' },
			{ title: '商品总价', dataIndex: 'goodsPrice' },
			{ title: '骑手费用', dataIndex: 'riderPrice' },
			{ title: '订单总价', dataIndex: 'totalPrice' },
			{
				title: '下单地址街道',
				dataIndex: 'addressStreet',
				render: (text, record) => {
					const status = streetList.find(v => text === v.value);
					return status.label || '未知';
				}
			},
			{ title: '下单小区楼栋', dataIndex: 'addressDetail' },
			{
				title: '订单状态',
				dataIndex: 'orderStatus',
				render: (text, record) => {
					const status = orderStatusList.find(v => text === v.value);
					return status.label || '未知';
				}
			},
			{
				title: '备注',
				dataIndex: 'remark'
			},
			{
				title: '操作',
				render: (text, record) => {
					if (record.orderStatus === 0) {
						return <a onClick={() => payMethod(record)}>立即支付</a>;
					}
					if (record.riderId && record.orderStatus === 3) {
						return (
							<Popconfirm
								title="是否确认订单？"
								onConfirm={e =>
									updateList(() =>
										$axios
											.post(`/api/token/GosOrder/confirm`, {
												id: record.id,
												userId: user.userId,
												riderId: record.riderId
											})
											.then(res => {
												message.success('确认收货成功');
											})
									)
								}
							>
								<a>确认收货</a>
							</Popconfirm>
						);
					}
					return <></>;
				}
			}
		],
		adminCheck: false,
		userCheck: true
	});

	function payMethod(order) {
		let htmlStr = `
		<form
			id="alipaysubmit"
			name="alipaysubmit"
			action="http://www.lugas.cn/api/token/GosOrder/pay"
			method="post"
			enctype="application/x-www-form-urlencoded"
			style="display:none;"
		>
			订单号：
			<input name="id" type="text" value="${order.id}" />
			总金额：
			<input name="totalPrice" type="number" value="${order.totalPrice}" />
			街道编号：
			<input name="addressStreet" type="number" value="${order.addressStreet}" />
			token：
			<input name="token" type="text" value="${user.token}" />
			<input type="submit" value="提交" />
		</form>
		`;
		const newWindow = window.open('', '_self');
		newWindow.document.write(htmlStr);
		newWindow.document.forms['alipaysubmit'].submit();
	}

	return (
		<>
			<Table {...tableProps} />
		</>
	);
}

export default RiderManage;
