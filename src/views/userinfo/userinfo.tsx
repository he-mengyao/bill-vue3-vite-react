import React, { useState } from 'react'
import { NavBar, Icon, Button, Input, Toast } from 'zarm';
import CcUpload from '../../components/cc-upload/cc-upload';
import api from '../../http/api';
import { useHistory } from 'react-router-dom'

const Userinfo = () => {
  let user = JSON.parse(localStorage.getItem('user')!)
  let [avatar, setavatar] = useState(user.avatar)
  let [signature, setsignature] = useState(user.signature)
  let history = useHistory()
  let headers = {
    Authorization: localStorage.getItem('token')
  }
  let uploadSuccess = (res: any) => {
    if (res.code === 200) {
      setavatar(`http://api.chennick.wang${res.data}`)
      Toast.show(res.msg)
    } else {
      Toast.show(res.msg)
    }
  }
  let uploadFail = (err: any) => {
    console.log(err)
  }
  // 提交
  let submit = () => {
    console.log(11);
    api.subsignature({
      signature: signature, avatar: avatar
    }).then((res: any) => {
      if (res.code === 200) {
        Toast.show('修改成功')
        history.push('/user')
      }
    }).catch(() => {
      console.log('修改个性签名请求失败');
    })
  }
  return (
    <div>
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="用户信息"
      />
      <div className={`line`}></div>
      <div className={`pd-10`}>
        <div className={`f24 mrtb-10`}>个人资料</div>
        <div className={`line`}></div>
        <div className={`mrtb-20 f14`}>头像</div>
        <div className={`flex ai-c`}>
          <img src={avatar} alt="" className={`img-80`} />
          <div className={`mrl-10 flex col flex-b`} style={{ height: 70 }}>
            <div>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</div>
            <CcUpload
              action='http://api.chennick.wang/api/upload'
              headers={headers}
              uploadSuccess={uploadSuccess}
              uploadFail={uploadFail}
            >
              <div><Button theme="primary" size='xs'>点击上传</Button></div>
            </CcUpload>
          </div>
        </div>
      </div>
      <div className={`line mrt-10`}></div>
      <div style={{ marginTop: 20, paddingLeft: 15, paddingRight: 15 }} className={`border-b`}>
        <div className={`f16`}>个性签名</div>
        <div className={`mrt-10`}>
          <Input
            clearable
            type="text"
            placeholder="请输入"
            value={signature}
            onChange={(value: any) => {
              setsignature(value);
            }}
          />
        </div>
      </div>
      <div className={`pd-10`} style={{ marginTop: 40 }}>
        <Button block theme="primary" onClick={submit}>
          保存
        </Button>
      </div>
    </div >
  )
}

export default Userinfo
