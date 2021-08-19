import React, { useState, useEffect } from 'react'
import { Popup, Icon, Keyboard, Input, Toast, DatePicker } from 'zarm';
import styles from '../../App.module.scss'
import dayjs from 'dayjs'
import arrow1 from '../../asstes/arrow1.png'
import api from '../../http/api'
import { icons } from '../../utils/index'

interface Props {
  visible: boolean,
  data?: any,
  sendVisible: (val: boolean) => void,
  onsuccess?: (res: any, id?: any) => void,
  onerror?: (err: any) => void,
}

const Edit = (Props: Props) => {
  let [date, setDate] = useState(Date.now())
  let [data, setData] = useState(Props.data ? Props.data : null)
  let [name, setName] = useState(data ? data.type_name : '餐饮')
  // 价格
  let [price, setPrice] = useState(data ? data.amount : '')
  // 备注
  let [remark, setRemark] = useState(data ? data.remark : '')
  // 弹出层显示
  let [visible, setVisible] = useState(Props.visible)
  // 日期选择器显示
  let [visible2, setVisible2] = useState(false)
  // 服饰列表
  let [list, setList] = useState([])
  // 判断支出还是收入
  let [id, setId] = useState(data ? data.id : 1)
  let [type_id, setType_id] = useState(data ? data.type_id : 1)
  let [pay_type, setPay_type] = useState(data ? data.pay_type : 1)
  // 判断添加备注显示
  let [num1, setnum1] = useState(0)
  const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747914_ch4qj4yag4.js');
  // 点击键盘
  let onkey = ((key: any) => {
    if (key === 'ok') {
      setnum1(0)
      if (price) {
        setVisible2(false)
        Props.sendVisible(false)
        if (data) {
          // 发请求
          api.editBill({
            id: id, // 账单 id
            amount: price, // 订单金额
            type_id: type_id, // 消费类型id
            type_name: name, // 消费类型名称
            date: String(date),// 消费时间
            pay_type: pay_type, // 账单类型 1:支出 2:收入
            remark: remark,
          }).then((res: any) => {
            Props.onsuccess && Props.onsuccess(res, id)
          }).catch((err: any) => {
            console.log('编辑订单请求失败');
            Props.onerror && Props.onerror(err)
          })
        } else {
          api.addBill({
            amount: Number(price),
            type_id: type_id,
            type_name: name,
            date: dayjs(date).valueOf(),
            pay_type: pay_type,
            remark: remark
          }).then((res: any) => {
            Props.onsuccess && Props.onsuccess(res)
          }).catch((err: any) => {
            console.log('添加账单请求失败');
            Props.onerror && Props.onerror(err)
          })
        }
      } else {
        Toast.show('请填写具体金额')
      }
    } else if (key === 'delete') {
      // 有问题，不处理
    } else if (key === 'close') {
      // 做减的操作
      setPrice(price.substring(0, price.length - 1))
    } else {
      if (num1 === 0) {
        setPrice(price += key)
      }
    }
  })
  // 时间确定
  let onk = (key: any) => {
    setVisible2(false)
    setDate(key)
  }
  // 获取类型列表
  let getList = () => {
    api.getList().then((res: any) => {
      if (res.code === 200) {
        setList(res.data.list)
        console.log(res.data.list);
      }
    }).catch(() => {
      console.log('获取类型列表失败');
    })
  }
  // 点击遮罩层
  let close = () => {
    setVisible(false)
    Props.sendVisible(false)
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      {/* 编辑弹出层 */}
      <Popup
        visible={visible}
        direction="bottom"
        onMaskClick={close}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div style={{
          backgroundColor: '#fff', borderTopRightRadius: 10, borderTopLeftRadius: 10,
        }}
          className={`overflow`}>
          <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            {/* 关闭 */}
            <div style={{ height: 40 }} className={`f14  bg-fff pr color-666`}>
              <div className={`${styles.close}`} onClick={close}>×</div>
            </div>
            {/* 收入和支出选项 */}
            <div className={`flex flex-b ai-c ${styles.tag}`} style={{ height: 30 }}>
              <div className={`flex`}>
                <div className={`${styles.tags} ${pay_type == '1' ? styles.tagactive : ''}`} onClick={() => {
                  setPay_type('1')
                  setType_id(1)
                }}>支出</div>
                <div className={`${styles.tags} mrl-10 ${pay_type == '2' ? styles.warning : ''}`}
                  onClick={() => { setPay_type('2'), setType_id(list.filter((i: any) => { return i.type === '1' }).length + 1) }}>收入</div>
              </div>
              <div className={`mrl-10 ${styles.yinying}`} onClick={() => { setVisible2(true) }}
                style={{ background: '#eee' }}>
                {dayjs(date).format('MM-DD')}
                <img src={arrow1} alt="" className={`${styles.img} mrl-10 `} />
              </div>
            </div> 
            <div className={`${styles.jine} f36 flex `}>
              <div className={`fw`}>￥</div>{price}
            </div>
            {/* 餐饮服饰 */}
            <div className={`${styles.scroll}`}>
              <div className={`flex ${styles.minibox}`}>
                <div style={{ height: 80 }} className={`pd-10`}>
                  <div className={`flex flex-b`} style={{ marginTop: 5 }}>
                    {
                      list.filter((i: any) => { return i.type == pay_type }).map((item: any, index: number) => {
                        return <div key={index}>
                          <div className={`flex col ai-c flex-c`} style={{ width: 50 }}
                            onClick={() => { setType_id(item.id), setName(item.name) }}
                          ><MyIcon type={icons.filter((i: any) => { return i.name === item.name })[0].info} theme={pay_type == '1' ? (item.id === type_id ? 'primary' : 'default') : (item.id === type_id ? 'warning' : 'default')} /></div>
                          <div className={`flex col ai-c flex-c`} style={{ width: 50 }}>{item.name}</div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              num1 === 0 ? <div className={`mrt-10 pd-10`} style={{ color: "#4b67e2" }}>
                {
                  remark ? <div onClick={() => { setnum1(1) }}>{remark}</div> : <div onClick={() => { setnum1(1) }}>添加备注</div>
                }
              </div> : <div className={`border-eee mrtb-10 pd-10 color-a0a0`}>
                <Input
                  rows={3}
                  type="text"
                  placeholder="请输入"
                  value={remark}
                  showLength
                  maxLength={50}
                  onChange={(value: any) => { setRemark(value) }}
                />
              </div>
            }
            {/* 键盘 */}
          </div>
          <Keyboard type="price" onKeyClick={(key) => { onkey(key) }} />
        </div>
      </Popup>
      {/* 日期选择器 */}
      <div>
        <DatePicker
          visible={visible2}
          className="test-dateSelect"
          mode='datetime'
          min="1974-05-16"
          defaultValue={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          max={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          value={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          onOk={(value: any) => {
            onk(value)
          }}
          onCancel={() => setVisible2(false)}
        />
      </div>
    </div >
  )
}

export default Edit
