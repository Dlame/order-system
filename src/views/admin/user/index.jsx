import React, { useState } from 'react';
import { Table, Input, Form, Button, Popconfirm, DatePicker, Divider } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import UserModal from '@/components/UserModal';

import { $axios } from '@/utils/interceptor';
import moment from 'moment';
import 'moment/locale/zh-cn';

import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';

function UserManage(props) {
  useBreadcrumb(['用户管理']);
  const [queryParams, setQueryParams] = useState({});
  const [modalType, setModalType] = useState('');
  const [visible, setVisible] = useState(0);
  const [record, setRecord] = useState({});
  const { getFieldDecorator } = props.form;

  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/adm/token/GosUser/query',
    queryParams,
    columns: [
      { title: '用户ID', dataIndex: 'id' },
      { title: '用户姓名', dataIndex: 'name' },
      { title: '登录邮箱', dataIndex: 'loginEmail' },
      { title: '手机号码', dataIndex: 'phone' },
      {
        title: '用户头像',
        dataIndex: 'headUrl',
        render: (text, record) => {
          return text && text.indexOf('http') ? (
            <span></span>
          ) : (
            <img alt={record.name} src={text} style={{ width: 50, height: 50 }} />
          );
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
        editable: true,
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <>
              <a onClick={() => showModal('编辑', 1, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除？"
                onConfirm={(e) =>
                  updateList(() =>
                    $axios.delete(`/adm/token/GosUser/delete/${record.id}`, { needCheck: true })
                  )
                }
              >
                <a className="delete-text">删除</a>
              </Popconfirm>
            </>
          );
        },
      },
    ],
  });

  function showModal(type, visible, record) {
    setModalType(type);
    setVisible(visible);
    setRecord(record);
  }

  // 条件查询
  function handleSearch(e) {
    e.preventDefault();
    props.form.validateFields(['search'], (err, values) => {
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
      <Form layout="inline" name="search" onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <Form.Item label="姓名">
          {getFieldDecorator('name')(<Input placeholder="请输入姓名" allowClear />)}
        </Form.Item>

        <Form.Item label="创建日期" name="createdTime">
          {getFieldDecorator('createdTime')(<DatePicker.RangePicker showTime locale={locale} />)}
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" style={{ marginRight: 8 }}>
            检索
          </Button>
          <Button type="primary" onClick={() => showModal('新建', 1, {})}>
            新建用户
          </Button>
        </Form.Item>
      </Form>
      <UserModal
        modalType={modalType}
        visible={visible}
        record={record}
        onCancel={() => setVisible(false)}
      />

      <Table {...tableProps} />
    </>
  );
}

export default Form.create()(UserManage);
