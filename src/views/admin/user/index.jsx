import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Form, Tag, Switch, Input, Button, Popconfirm, Select } from 'antd';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { $axios } from '@/utils/interceptor';

import useBreadcrumb from '@/hooks/useBreadcrumb';
import useAntdTable from '@/hooks/useAntdTable';

function UserManager(props) {
	const { getFieldDecorator } = props.form;
	const [queryParams, setQueryParams] = useState({});
	const [batch, setBatch] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	// 请求文章
	const { tableProps, updateList, onSearch } = useAntdTable({
		requestUrl: '/article/list',
		queryParams,
		columns: [
			{
				title: '标题',
				dataIndex: 'title'
			},
			{
				dataIndex: 'id',
				title: '操作',
				render: (articleId, record) => (
					<ul className="action-list">
						<li>
							<Link to={`/article/${articleId}`}>查看</Link>
						</li>
						<li>
							<Link>编辑</Link>
						</li>
						<li>
							<Popconfirm
								title="Are you sure？"
								cancelText="No"
								onConfirm={() => updateList(() => $axios.delete(`/article/${articleId}`))}
							>
								<a className="delete-text">删除</a>
							</Popconfirm>
						</li>
					</ul>
				)
			}
		]
	});

	// 提交搜索条件
	function handleSubmit(e) {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				setQueryParams({ ...queryParams, ...values });
				onSearch({ ...queryParams, ...values });
			}
		});
	}
	// 属性排列
	const rowSelection = batch
		? {
				selectedRowKeys,
				onChange: selectList => setSelectedRowKeys(selectList)
		  }
		: null;

	return (
		<div className="admin-article-manager">
			<Form layout="inline" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
				<Form.Item label="关键词">
					{getFieldDecorator('keyword')(<Input placeholder="请输入关键词" allowClear />)}
				</Form.Item>
				<Form.Item label="条件一">
					{getFieldDecorator('condition')(<Input placeholder="请输入条件" allowClear />)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
						检索
					</Button>
				</Form.Item>
			</Form>
			<Table
				{...tableProps}
				rowSelection={rowSelection}
				footer={() => (
					<>
						批量操作{' '}
						<Switch
							checked={batch}
							onChange={e => setBatch(prev => !prev)}
							style={{ marginRight: 8 }}
						/>
						{batch && (
							<>
								<Button
									type="primary"
									size="small"
									style={{ marginRight: 8 }}
									disabled={selectedRowKeys.length === 0}
								>
									导出选中项
								</Button>
								<Popconfirm title="确定删除吗？" okText="是" cancelText="否">
									<Button type="primary" size="small" disabled={selectedRowKeys.length === 0}>
										批量删除
									</Button>
								</Popconfirm>
							</>
						)}
					</>
				)}
			/>
		</div>
	);
}

export default Form.create()(UserManager);
