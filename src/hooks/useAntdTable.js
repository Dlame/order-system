import { useState, useCallback } from 'react';
import { $axios } from '../utils/interceptor';
import useMount from './useMount';
import { useSelector } from 'react-redux';

/**
 * useAntdTable hooks 用于处理 loading 逻辑以及换页 检索等
 *
 * @param {Object} obj
 * @param {Function} obj.fetchList 获取列表的函数
 * @param {Object} obj.queryParams 默认要检索的参数
 */

export default function useAntdTable({
  requestUrl = '',
  queryParams = null,
  columns = [],
  isAdmin = true,
  adminCheck = false,
  userCheck = false
}) {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [tablePagination, setTablePagination] = useState({ current: 1, pageSize: 10, totoal: 0 });
  const userId = useSelector(state => state.user.userId);

  useMount(fetchListWithLoading);

  function fetchDataList(params) {
    const requestParams = {
      page: tablePagination.current,
      size: tablePagination.pageSize,
      ...queryParams,
      ...params,
    };

    if(userCheck){
      requestParams.userId = userId
    }

    $axios
      .post(requestUrl, requestParams, { adminCheck, userCheck })
      .then((res) => {
        const { data, totalSize, currentPage } = res;

        tablePagination.current = currentPage;
        tablePagination.total = totalSize;
        setTablePagination({ ...tablePagination }); // 设置分页
        setDataList(data);
        setLoading(false);
        console.log('%c useAntdTabled', 'background: yellow', requestParams, data);
      })
      .catch((error) => {
        console.log('fetchDataList error: ', requestParams, error);
        setLoading(false);
      });
  }

  async function fetchListWithLoading(params) {
    setLoading(true);
    fetchDataList(params);
  }

  async function updateList(func) {
    try {
      setLoading(true);
      await func();
      fetchDataList();
    } catch (error) {
      console.log('updateList error: ', error);
      setLoading(false);
    }
  }

  /**
   * 分页、排序、筛选变化时触发
   * 注意 当前只封装分页
   */
  function handleTableChange(pagination, filters, sorter) {
    if (JSON.stringify(filters) === '{}' && JSON.stringify(sorter) === '{}') {
      fetchListWithLoading({ page: pagination.current });
    }
  }

  /**
   * 检索功能
   */
  function onSearch(params) {
    fetchListWithLoading({ page: 1, ...params });
  }

  return {
    tableProps: {
      className: isAdmin ? 'admin-table' : '',
      rowKey: 'id',
      loading,
      columns,
      dataSource: dataList,
      pagination: {
        current: tablePagination.current,
        pageSize: tablePagination.pageSize,
        total: tablePagination.total,
        showTotal: (total) => `共 ${total} 条`,
      },
      onChange: handleTableChange,
    },
    dataList,
    updateList: useCallback(updateList, [tablePagination, queryParams]), // 进行 action 操作 比如删除修改数据后获取数据 @example updateList(() => { return axios.put('xxxx') })
    onSearch: useCallback(onSearch, [tablePagination, queryParams]),
    setLoading: useCallback(setLoading, []),
  };
}
