import http from "./"

export default {
  register({ username, password }: { username: string, password: string }) {
    return http.post('/api/user/register', { username, password })
  },
  login({ username, password }: { username: string, password: string }) {
    return http.post('/api/user/login', { username, password })
  },
  // 获取类型列表
  getList() {
    return http.get(`/api/type/list`)
  },
  // 获取用户信息
  getUser() {
    return http.get(`/api/user/get_userinfo`)
  },
  // 修改用户密码
  subPass({ old_pass, new_pass, new_pass2 }: { old_pass: string, new_pass: string, new_pass2: string }) {
    return http.post(`/api/user/modify_pass`, { old_pass, new_pass, new_pass2 })
  },
  // 修改个性签名
  subsignature({ signature, avatar }: { signature: string, avatar: string }) {
    return http.post(`/api/user/edit_userinfo`, { signature, avatar })
  },
  // 添加账单
  addBill({ amount, type_id, type_name, date, pay_type, remark }: { amount: number, type_id: number, type_name: string, date: number, pay_type: number, remark: string }) {
    return http.post(`/api/bill/add`, { amount, type_id, type_name, date, pay_type, remark })
  },
  // 获取账单列表
  getBill({ date, page, page_size, type_id }: { date: string, page: number, page_size: number, type_id: string }) {
    return http.get(`api/bill/list?date=${date}&page=${page}&page_size=${page_size}&type_id=${type_id}`)
  },
  // 账单详情
  getDetail({ id }: { id: any }) {
    return http.get(`api/bill/detail?id=${id}`)
  },
  // 删除账单
  delBill({ id }: { id: any }) {
    return http.post(`/api/bill/delete`, { id })
  },
  // 数据统计
  getBilldata({ date }: { date: string }) {
    return http.get(`/api/bill/data?date=${date}`)
  },
  // 编辑订单
  editBill({ id, amount, type_id, type_name, date, pay_type, remark }: { id: any, amount: any, type_id: any, type_name: any, date: any, pay_type: any, remark: any }) {
    return http.post(`/api/bill/update`, { id, amount, type_id, type_name, date, pay_type, remark })
  }
}