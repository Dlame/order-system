import React, { useState } from 'react';
import useMount from '@/hooks/useMount';

import { Modal, Row, Col } from 'antd';

import { $axios } from '@/utils/interceptor';

function GainOrder() {
	const [visible, setVisible] = useState(true);
	const [order, setOrder] = useState({});
	useMount(() => {
		document.title = '订单确认';
		$axios.post('/adm/token/GosOrder/query', { id: '1247554111726030848' }).then(res => {
      console.log(res);
    });
	});

	return (
		<Modal closable={false} mask maskClosable={false} visible={visible}>
			<Row>
				<Col span={6}></Col>
				<Col span={18}></Col>
			</Row>
		</Modal>
	);
}

export default GainOrder;
