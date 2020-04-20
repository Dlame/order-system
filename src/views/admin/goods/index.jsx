import React, { useState } from 'react';
import { Table, Input, Form, Button, Popconfirm, DatePicker, Divider, message } from 'antd';
import GoodsModal from '@/components/GoodsModal';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { $axios } from '@/utils/interceptor';
import moment from 'moment';
import 'moment/locale/zh-cn';

import useAntdTable from '@/hooks/useAntdTable';
import useBreadcrumb from '@/hooks/useBreadcrumb';

function GoodsManage(props) {
  useBreadcrumb(['商品管理']);
  const { getFieldDecorator } = props.form;
  const [queryParams, setQueryParams] = useState({});
  const [modalType, setModalType] = useState('');
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});

  const { tableProps, updateList, onSearch } = useAntdTable({
    requestUrl: '/adm/token/GosGoods/query',
    queryParams,
    columns: [
      { title: '商品id', dataIndex: 'id' },
      { title: '商品名称', dataIndex: 'name' },
      {
        title: '商品图片',
        dataIndex: 'logoUrl',
        render: (text, record) => {
          return text && text.indexOf('http') ? (
            <span></span>
          ) : (
            <img alt={record.name} src={text} style={{ width: 50, height: 50 }} />
          );
        },
      },
      { title: '商品简介', dataIndex: 'introduce' },
      { title: '商品数量', dataIndex: 'restNum' },
      { title: '商品价格', dataIndex: 'price' },
      { title: '商品销量', dataIndex: 'costs' },
      { title: '商家名称', dataIndex: 'shopName' },
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
        render: (text, record) => {
          return (
            <>
              <a onClick={() => showModal('编辑', true, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除？"
                onConfirm={(e) =>
                  updateList(() =>
                    $axios.delete(`/adm/token/GosGoods/delete/${record.id}`, { adminCheck: true }).then(res=>{
                      if (res.code !== 200) {
                        message.error(res.desc);
                        return;
                      }
                    })
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
    adminCheck: true
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
        delete param.createdTime;
        setQueryParams({ ...queryParams, ...param });
        onSearch({ ...queryParams, ...param });
      }
    });
  }

  function onCancel() {
    setTimeout(() => {
      updateList(() => setVisible(false));
    }, 500);
  }

  return (
    <>
      {/* 检索 */}
      <Form layout="inline" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <Form.Item label="商品名">
          {getFieldDecorator('name')(<Input placeholder="请输入商品名" allowClear />)}
        </Form.Item>

        <Form.Item label="创建日期">
          {getFieldDecorator('createdTime')(<DatePicker.RangePicker showTime locale={locale} />)}
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" style={{ marginRight: 8 }}>
            检索
          </Button>
          <Button type="primary" onClick={() => showModal('新建', true, {})}>
            新建商品
          </Button>
        </Form.Item>
      </Form>

      <Table {...tableProps} />

      <GoodsModal
        modalType={modalType}
        visible={visible}
        record={record}
        onCancel={() => onCancel()}
      />
    </>
  );
}

export default Form.create()(GoodsManage);
