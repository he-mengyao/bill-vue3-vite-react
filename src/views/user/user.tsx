import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Tabbars from '../../components/tabbars/tabbars'
import api from '../../http/api'
import geqian from '../../asstes/geqian.png'
import styles from '../../App.module.scss'
import shezhi from '../../asstes/shezhi.png'
import lainxi from '../../asstes/lianxi.png'
import zhaq from '../../asstes/zhaq.png'
import youjiantou from '../../asstes/youjiantou.png'
import { Button } from 'zarm';

const Data = () => {
  let [name, setName] = useState('')
  let [signature, setsignature] = useState('')
  let [avatar, setavatar] = useState('')
  let history = useHistory()
  let getUser1 = () => {
    api.getUser().then((res: any) => {
      if (res.code === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setName(res.data.username)
        setavatar(res.data.avatar)
        setsignature(res.data.signature)
      }
    }).catch(() => {
      console.log('获取用户信息请求失败');
    })
  }
  useEffect(() => {
    getUser1()
  }, [])
  return (
    <div>
      <div className={` pr`} style={{ height: 160, padding: 20, background: '#4c7bdf' }}>
        <div className={`${styles.name} flex flex-b`}>
          <div>
            <div style={{ height: 21, width: 124, borderRadius: 10, background: '#597fe7' }}
              className={`flex flex-c ai-c f16 cw`}
            >昵称：{name}</div>
            <div className={`f14 cw flex ai-c mrt-10`}>
              <img src={geqian} alt="" style={{ height: 30, width: 30 }} />{signature}
            </div>
          </div>
          <div><img src={avatar} alt="" style={{ height: 60, width: 60 }} /></div>
        </div>
      </div>
      <div className={`${styles.card} flex col f16 color-3434`}>
        <div className={`${styles.carditem} flex flex-b ai-c flex-1`} onClick={() => { history.push('/userinfo') }}>
          <div>
            <div className={` flex ai-c`}><img className={`img-20 mrr-10`} src={shezhi}></img>用户信息修改</div>
          </div>
          <img src={youjiantou} alt="" className={`img-20 mrr-10`} />
        </div>
        <div className={`${styles.carditem} flex flex-b ai-c flex-1`} onClick={() => { history.push('/account') }}>
          <div className={`flex ai-c`}><img className={`img-20 mrr-10`} src={zhaq}></img>重置密码</div>
          <img src={youjiantou} alt="" className={`img-20 mrr-10`} />
        </div>
        <div className={`${styles.carditem} flex flex-b ai-c flex-1`} onClick={() => { history.push('/about') }}>
          <div className={`flex ai-c`}><img className={`img-20 mrr-10`} src={lainxi}></img>联系我们</div>
          <img src={youjiantou} alt="" className={`img-20 mrr-10`} />
        </div>
      </div>
      <div className={`${styles.quit}`}>
        <Button block theme="danger" onClick={() => { localStorage.removeItem('token'), history.push('/') }}>
          退出登录
        </Button>
      </div>
      {/* tabbar */}
      <Tabbars active='user'></Tabbars>
    </div>
  )
}

export default Data
