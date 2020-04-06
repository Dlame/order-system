/**
 * 获取 url query 参数
 * @param {*} url 路径
 */
export const decodeQuery = (url) => {
  const params = {};
  const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach((v) => {
    const d = v.split('=');
    if (d[1] && d[0]) params[d[0]] = d[1];
  });
  return params;
};

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path);
}
