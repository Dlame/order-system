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

/**
 * 除法函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * @param {*} arg1 被除数
 * @param {*} arg2 除数
 */
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * @param {*} arg1 因数
 * @param {*} arg2 因数
 */
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}
