import React, { useState } from 'react';
import { Input, Icon } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import useMount from '@/hooks/useMount';
import { decodeQuery } from '@/utils';

function SearchButton(props) {
	const history = useHistory();
	const location = useLocation();
	const [name, setName] = useState('');

	useMount(() => {
		const { name } = decodeQuery(location.search);
		name && setName(name);
	});

	const handleChange = e => {
		setName(e.target.value);
	};

	const handleSubmit = () => {
		history.push(name ? `/?page=1&name=${name}` : '/');
	};

	const handlePressEnter = e => {
		e.target.blur();
	};

	return (
		<div id="search-box">
			<Icon
				type="search"
				className="search-icon"
				onClick={e => props.history.push(name ? `/?page=1&name=${name}` : '/')}
			/>
			<Input
				type="text"
				value={name}
				onChange={handleChange}
				onBlur={handleSubmit}
				onPressEnter={handlePressEnter}
				className="search-input"
				placeholder="搜索菜品"
				style={{ width: 200 }}
			/>
		</div>
	);
}

export default SearchButton;
