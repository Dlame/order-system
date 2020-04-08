import React, { useState } from 'react';
import { Table, Input, Form, Button, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

// import { $axios } from '@/utils/interceptor';
import 'moment/locale/zh-cn';

import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';

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
	{ value: 5, label: '订单取消' }
];

function RiderManage(props) {
	useBreadcrumb(['订单管理']);
	const { getFieldDecorator } = props.form;
	const [queryParams, setQueryParams] = useState({});
	const { tableProps, onSearch } = useAntdTable({
		requestUrl: '/adm/token/GosOrder/query',
		queryParams,
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
				title: '操作'
				// render: (userId, record) => (
				//   <Popconfirm
				//     title="Are you sure？"
				//     onConfirm={(e) => updateList(() => $axios.delete(`/user/${userId}`))}
				//   >
				//     <a className="delete-text">删除</a>
				//   </Popconfirm>
				// ),
			}
		]
	});

	function handleSubmit(e) {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				let param = values;
				if (Array.isArray(values.createdTime)) {
					values.createdTime = values.createdTime.map(m => m.format('YYYY-MM-DD HH:mm:ss'));
					param.startTime = values.createdTime[0];
					param.endTime = values.createdTime[1];
					delete param.createdTime;
				}
				setQueryParams({ ...queryParams, ...param });
				onSearch({ ...queryParams, ...param });
			}
		});
	}

	return (
		<>
			{/* 检索 */}
			<Form layout="inline" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
				<Form.Item label="用户姓名">
					{getFieldDecorator('userName')(<Input placeholder="请输入用户姓名" allowClear />)}
				</Form.Item>
				<Form.Item label="骑手姓名">
					{getFieldDecorator('riderName')(<Input placeholder="请输入骑手姓名" allowClear />)}
				</Form.Item>
				<Form.Item label="创建日期" name="createdTime">
					{getFieldDecorator('createdTime')(<DatePicker.RangePicker showTime locale={locale} />)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
						检索
					</Button>
				</Form.Item>
			</Form>

			<Table {...tableProps} />
		</>
	);
}

export default Form.create()(RiderManage);
