import React, { useState } from 'react';
import { Table, Input, Form, Button, Popconfirm, DatePicker, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { $axios } from '@/utils/interceptor';
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
  { value: 5, label: '江岸区谌家矶' },
];

function RiderManage(props) {
  useBreadcrumb(['订单管理']);
  const [queryParams, setQueryParams] = useState({});
  const { tableProps, updateList, onSearch } = useAntdTable({
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
      { title: '下单地址街道', dataIndex: 'addressStreet' },
      { title: '下单小区楼栋', dataIndex: 'addressDetail' },
      { title: '订单状态', dataIndex: 'orderStatus' },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (userId, record) => (
          <Popconfirm
            title="Are you sure？"
            onConfirm={(e) => updateList(() => $axios.delete(`/user/${userId}`))}
          >
            <a className="delete-text">删除</a>
          </Popconfirm>
        ),
      },
    ],
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (Array.isArray(values.rangeDate)) {
          values.rangeDate = values.rangeDate.map((m) => m.format('YYYY-MM-DD'));
        }
        setQueryParams({ ...queryParams, ...values });
        onSearch({ ...queryParams, ...values });
      }
    });
  }

  return (
    <>
      {/* 检索 */}
      <Form layout="inline" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label="姓名" name="username">
          <Input placeholder="请输入骑手姓名" allowClear />
        </Form.Item>

        <Form.Item label="创建日期" name="createdTime">
          <DatePicker.RangePicker locale={locale} />
        </Form.Item>

        <Form.Item label="下单街道" name="street">
          <Select style={{ width: 200 }} allowClear>
            {streetList.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
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

export default RiderManage;
