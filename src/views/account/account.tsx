import React, { useState } from 'react'
import { NavBar, Icon, Input, Cell, Button, Toast } from 'zarm';
import api from '../../http/api';
import { useHistory } from 'react-router-dom'

const Account = () => {
  const [password, setpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [newpassword1, setnewpassword1] = useState('');
  let history = useHistory()
  let submit = () => {
    if (password !== '' && newpassword !== '' && newpassword1 !== '') {
      api.subPass({
        old_pass: password, new_pass: newpassword, new_pass2: newpassword1
      }).then((res: any) => {
        if (res.code === 200) {
          Toast.show('修改成功')
          history.push('/user')
        } else {
          Toast.show(res.msg)
        }
      }).catch(() => {
        console.log('修改用户密码请求失败');
      })
    } else {
      Toast.show('表单填写有误，请检查')
    }
  }
  return (
    <div>
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="重置密码"
      />
      <Cell title="原密码">
        <Input
          clearable
          type="text"
          placeholder="请输入原密码"
          value={password}
          onChange={(value: any) => {
            setpassword(value);
          }}></Input>
      </Cell>
      <Cell title="新密码">
        <Input
          clearable
          type="password"
          placeholder="请输入新密码"
          value={newpassword}
          onChange={(value: any) => {
            setnewpassword(value);
          }}></Input>
      </Cell>
      <Cell title="确认密码">
        <Input
          clearable
          type="password"
          placeholder="请再次输入新密码确认"
          value={newpassword1}
          onChange={(value: any) => {
            setnewpassword1(value);
          }}></Input>
      </Cell>
      <div className={`line`} style={{ marginLeft: 15 }}></div>
      <div style={{ marginTop: 50, paddingLeft: 15, paddingRight: 15 }}>
        <Button block theme="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  )
}

export default Account
