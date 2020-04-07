import React, { useState } from 'react';
import { Table, Input, Form, Button, Popconfirm, DatePicker, Select, Divider } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import RiderModal from '@/components/RiderModal';

import { $axios } from '@/utils/interceptor';
import moment from 'moment';
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

// 骑手状态
const riderStatusList = [
  { value: 0, label: '等待接单' },
  { value: 1, label: '正在派送' },
  { value: 2, label: '停止接单' },
];

function RiderManage(props) {
  useBreadcrumb(['骑手管理']);
  const [queryParams, setQueryParams] = useState({});
  const [modalType, setModalType] = useState('');
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const { getFieldDecorator } = props.form;
  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/adm/token/GosRider/query',
    queryParams,
    columns: [
      { title: '骑手ID', dataIndex: 'id' },
      { title: '骑手姓名', dataIndex: 'name' },
      { title: '登陆邮箱', dataIndex: 'loginEmail' },
      { title: '手机号码', dataIndex: 'phone' },
      {
        title: '骑手头像',
        dataIndex: 'headUrl',
        render: (text, record) => {
          return text && text.indexOf('http') ? (
            <span></span>
          ) : (
            <img alt={record.name} src={text} style={{ width: 50, height: 50 }} />
          );
        },
      },
      { title: '历史接单量', dataIndex: 'historyOrders' },
      { title: '历史接单收益', dataIndex: 'historyIncome' },
      // { title: '每单价格', dataIndex: 'email' },
      {
        title: '管辖街道',
        dataIndex: 'addressStreet',
        render: (text, record) => {
          const status = streetList.find((v) => text === v.value);
          return status.label || '未知';
        },
      },
      {
        title: '骑手状态',
        dataIndex: 'riderStatus',
        render: (text, record) => {
          const status = riderStatusList.find((v) => text === v.value);
          return status.label || '未知';
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: (a, b) => (moment(a.createTime).isBefore(b.createTime) ? 1 : -1),
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        sorter: (a, b) => (moment(a.updateTime).isBefore(b.updateTime) ? 1 : -1),
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text, record) => (
          <>
            <a onClick={() => showModal('编辑', true, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除？"
              onConfirm={(e) =>
                updateList(() => {
                  return $axios.delete(`/adm/token/GosRider/delete/${record.id}`);
                })
              }
            >
              <a className="delete-text">删除</a>
            </Popconfirm>
          </>
        ),
      },
    ],
  });

  function showModal(type, visible, record) {
    setModalType(type);
    setVisible(visible);
    setRecord(record);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param = values;
        if (Array.isArray(values.createdTime)) {
          values.createdTime = values.createdTime.map((m) => m.format('YYYY-MM-DD HH:mm:ss'));
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
        <Form.Item label="姓名">
          {getFieldDecorator('name')(<Input placeholder="请输入骑手姓名" allowClear />)}
        </Form.Item>

        <Form.Item label="管辖街道">
          {getFieldDecorator('addressStreet')(
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
          {getFieldDecorator('riderStatus')(
            <Select style={{ width: 200 }} allowClear>
              {riderStatusList.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="创建日期">
          {getFieldDecorator('createdTime')(<DatePicker.RangePicker showTime locale={locale} />)}
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" style={{ marginRight: 8 }}>
            检索
          </Button>
          <Button type="primary" onClick={() => showModal('新建', true, {})}>
            新建用户
          </Button>
        </Form.Item>
      </Form>
      <Table {...tableProps} />
      <RiderModal
        modalType={modalType}
        visible={visible}
        record={record}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default Form.create()(RiderManage);
