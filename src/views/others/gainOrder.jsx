import React from 'react';
import useMount from '@/hooks/useMount';
import { useLocation, useHistory } from 'react-router-dom';

import { Modal,message } from 'antd';

import { decodeQuery } from '@/utils';
import { $axios } from '@/utils/interceptor';

function GainOrder(props) {
  const location = useLocation();
  const history = useHistory();
  useMount(() => {
    document.title = '订单确认';
    const { oid, rid } = decodeQuery(location.search);
    Modal.confirm({
      title: '',
      content: '是否确认配送？',
      mask: true,
      maskClosable: false,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return new Promise((resolve, reject) => {
          $axios
            .get(`/api/reorder/${oid}/${rid}`)
            .then((res) => {
              if (res.code !== 200) {
                message.error(res.desc);
                return;
              }
              resolve();
              history.push('/');
            })
            .catch((err) => {
              reject();
            });
        });
      },
    });
  });

  return <></>;
}

export default GainOrder;
