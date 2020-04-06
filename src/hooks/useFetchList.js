import { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import useMount from './useMount';
import { decodeQuery } from '../utils';

import { $axios } from '../utils/interceptor';

/**
 * fetchList
 * @param {*} requestUrl 请求地址
 * @param {*} queryParams 请求参数
 * @param {*} withLoading 是否携带 loading
 * @param {*} fetchDependence 依赖 => 可以根据地址栏解析拉取列表
 */
export default function useFetchList({
  requestUrl = '',
  queryParams = null,
  withLoading = true,
  fetchDependence = [],
}) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const location = useLocation();
  const history = useHistory();

  useMount(() => {
    if (fetchDependence.length === 0) {
      fetchWithLoading();
    }
  });

  useEffect(() => {
    if (fetchDependence.length > 0) {
      const params = decodeQuery(location.search);
      fetchWithLoading(params);
    }
  }, fetchDependence);

  function fetchWithLoading(params) {
    withLoading && setLoading(true);
    fetchDataList(params);
  }

  function fetchDataList(params) {
    const requestParams = {
      page: parseInt(pagination.current),
      pageSize: parseInt(pagination.pageSize),
      ...queryParams,
      ...params,
    };

    $axios
      .get(requestUrl, { params: requestParams })
      .then(res => {
        pagination.total = res.count;
        pagination.current = parseInt(requestParams.page);
        pagination.pageSize = parseInt(requestParams.pageSize);
        setPagination({ ...pagination });
        setDataList(res.rows);
        withLoading && setLoading(false);
      })
      .catch(e => withLoading && setLoading(false));
  }

  const onFetch = useCallback(
    params => {
      withLoading && setLoading(true);
      fetchDataList(params);
    },
    [queryParams]
  );

  const handlePageChange = useCallback(
    page => {
      const search = location.search.includes('page=')
        ? location.search.replace(/(page=)(\d+)/, `$1${page}`)
        : `?page=${page}`;
      const jumpUrl = location.pathname + search;
      history.push(jumpUrl);
    },
    [queryParams, location.pathname]
  );

  return {
    dataList,
    loading,
    pagination: {
      ...pagination,
      onChange: handlePageChange,
    },
    onFetch,
  };
}
