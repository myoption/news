/**
 * @desc 存储数据
 * @param {*} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * @desc 获取数据
 * @param {*} key
 */
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * @desc 删除数据
 * @param {*} key
 */
export const romveItem = key => {
  localStorage.removeItem(key)
}
