import React, { useState, useEffect } from 'react'
import styles from '../../App.module.scss'
import img from '../../asstes/login.png'
import shouji from '../../asstes/shouji.png'
import mima from '../../asstes/mima.png'
import { Input, Cell, Checkbox, Button, Toast } from 'zarm';
import api from '../../http/api'
import { useHistory } from 'react-router-dom'

const Login = () => {
  let [arr, setArr] = useState(['登录', '注册'])
  let [num, setNum] = useState<number>(0)
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [yanzheng, setYanzheng] = useState('')
  let [value, setValue] = useState(false)
  let history = useHistory()
  let clickItem = (item: string, index: number) => {
    setNum(index)
  }
  // 随机生成验证码
  let arr1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let [arr3, setArr3] = useState([])
  // 点击验证码
  let change = () => {
    let arr2: any = []
    if (arr1.length === 0) {
      arr1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    } else {
      arr2 = []
      for (var i = 0; i < 4; i++) {
        //随机下标0~25
        //0~1*26 0~25.x 向下取整 0~25
        var n = Math.floor(Math.random() * arr1.length);
        // console.log(n,arr[n]);
        // 将每次获取的随机元素放入到arr2里
        arr2.push(arr1[n]);//console.log(n,arr[n]);
        //解决不重复，每次获取到随机后，从原数据组删除该元素
        arr1.splice(n, 1);
      }
    }
    setArr3(arr2)
  }
  // 账号输入
  let onInput1 = (e: any) => {
    setUsername((e.target as any).value)
  }
  let onInput2 = (e: any) => {
    setPassword((e.target as any).value)
  }
  let onInput3 = (e: any) => {
    setYanzheng((e.target as any).value)
  }
  // 是否选中
  let changeBox = (e: any) => {
    setValue((e.target as any).checked)
  }
  // 注册请求
  let register = () => {
    api.register({ username: username, password: password }).then((res: any) => {
      // console.log(res);
      if (res.code === 200) {
        setNum(0)
        Toast.show(res.msg)
      } else {
        Toast.show(res.msg)
      }
    }).catch((err: any) => {
      console.log('注册请求失败');
    })
  }
  // 登录请求
  let login = () => {
    api.login({ username: username, password: password }).then((res: any) => {
      if (res.code === 200) {
        console.log(res);
        Toast.show(res.msg)
        localStorage.setItem('token', res.data.token)
        history.push('/')
      }
    }).catch((err: any) => {
      console.log('登录请求失败');
    })
  }
  // 点击登录
  let clicklogin = () => {
    if (username === '') {
      Toast.show('账号不能为空')
    } else if (password === '') {
      Toast.show('密码不能为空')
    } else if (yanzheng === '' && num === 1) {
      Toast.show('验证码不能为空')
    } else if (yanzheng !== arr3.join('') && num === 1) {
      Toast.show('验证码错误，请重新输入')
    } else if (value === false && num === 1) {
      Toast.show('请先勾选条款')
    } else {
      if (num === 1) {
        register()
      } else {
        login()
      }
    }
  }
  useEffect(() => {
    change()
  }, [])
  return (
    <div className={`${styles.login}`}>
      <div><img src={`${img}`} alt="" className={`${styles.img}`} /></div>
      <div className={`flex color-blue f14 fw`}>
        {
          arr.map((item: string, index: number) => {
            return (
              <div key={index} onClick={() => clickItem(item, index)} className={`flex col ai-c flex-c`}>
                <div className={`${styles.item} flex ai-c flex-c ${num === index ? styles.click : ''}`}>{item}</div>
                <div className={`${num === index ? styles.line : ''}`}></div>
              </div>
            )
          })
        }
      </div>
      <div className={`mrtb-20 f14 flex ai-c`}>
        <label style={{ marginRight: 20 }}><img src={`${shouji}`} className={`${styles.label}`}></img></label>
        <input type="text" placeholder='请输入账号' onInput={(e) => onInput1(e)} />
      </div>
      <div className={`mrtb-20 f14 flex ai-c`}>
        <label style={{ marginRight: 20 }}><img src={`${mima}`} className={`${styles.label}`}></img></label>
        <input type="password" placeholder='请输入密码' onInput={(e) => onInput2(e)} />
      </div>
      {
        num === 1 ?
          <div>
            <div className={`mrtb-20 f14 flex ai-c`}>
              <label style={{ marginRight: 20 }}><img src={`${mima}`} className={`${styles.label}`}></img></label>
              <input type="text" placeholder='请输入验证码' onInput={(e) => onInput3(e)} />
              <div className={`${styles.yanzheng} flex ai-c flex-c color-333`} onClick={change}>{arr3}</div>
            </div>
            <div className={`color-a0a0`}>
              <Checkbox onChange={(e) => changeBox(e)} checked={value}>阅读并同意《掘掘手札条款》</Checkbox>
            </div>
          </div> : <div></div>
      }
      <div className={`mrtb-20`}>
        <Button block theme="primary" onClick={() => clicklogin()}>
          {num === 0 ? '登录' : '注册'}
        </Button>
      </div>
    </div>

  )
}

export default Login
