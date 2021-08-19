import React, { useState, useReducer, useEffect } from 'react'
import styles from '../../App.module.scss'
import arrow from '../../asstes/arrow.png'
import arrow1 from '../../asstes/arrow1.png'
import empty from '../../asstes/empty.png'
import dayjs from 'dayjs'
import { DatePicker, Popup, Icon, Keyboard, Input, Toast } from 'zarm';
import Tabbars from '../../components/tabbars/tabbars'
import api from '../../http/api'
import bianji from '../../asstes/bianji.png'
import zhi from '../../asstes/zhi@2x.png'
import shou from '../../asstes/shou@2x.png'
import { useHistory } from 'react-router-dom'
import { iicons, oicons, icons } from '../../utils/index'
import Edit from '../../components/edit/edit'

interface Obj {
  date: string,
  bills: []
}
interface types {
  id: number,
  name: string
  type: string
  user_id: number
}
const Home = () => {
  let history = useHistory()
  const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747914_ch4qj4yag4.js');
  let [income, setIncome] = useState(0)
  let [outlay, setOutlay] = useState(0)
  let [time, setTime] = useState(Date.now())
  // 编辑选中的时间
  let [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [visible, setVisible] = useState(false)
  let [visible1, setVisible1] = useState(false)
  // 编辑页面显示
  let [visible2, setVisible2] = useState(false)
  let [outlayList, setOutlayList] = useState<types[]>([])
  let [incomeList, setIncomeList] = useState<types[]>([])
  // 选择类型
  let [items, setitems] = useState<types>({
    id: 1,
    name: '全部类型',
    type: '0',
    user_id: 0,
  })
  // 账单列表
  let [list, setList] = useState<Obj[]>([])
  // 关于账单列表
  let [page, setpage] = useState(1)
  let [pagesize, setpagesize] = useState(5)
  // 价格
  let [price, setPrice] = useState('')
  // 添加备注
  let [info, setinfo] = useState('')
  // 服饰高亮
  let [activeIndex, setactiveIndex] = useState(0)
  // 收入工资高亮
  let [activeIndex1, setactiveIndex1] = useState(0)
  // 判断打开日期
  let [n, setN] = useState(0)
  // 判断支出还是收入
  let [num, setNum] = useState(0)
  // 判断添加备注显示
  let [num1, setnum1] = useState(0)
  // 图标
  let [iconfonts, seticonfonts] = useState<any>()
  // 获取数据列表
  let getList = () => {
    api.getList().then((res: any) => {
      if (res.code === 200) {
        setOutlayList(res.data.list.filter((item: any) => { return item.type === '1' }))
        setIncomeList(res.data.list.filter((item: any) => { return item.type === '2' }))
      }
    }).catch(() => {
      console.log('获取类型列表失败');
    })
  }
  // 获取账单列表
  let getbillList = (time: any, id: any) => {
    api.getBill({
      date: time,
      page: page,
      page_size: pagesize,
      type_id: id
    }).then((res: any) => {
      if (res.code === 200) {
        res.data.list.map((item: any) => {
          item.bills = item.bills.reverse()
        })
        // console.log(res);
        setList(res.data.list)
        setIncome(res.data.totalIncome)
        setOutlay(res.data.totalExpense)
      }
    }).catch(() => {
      console.log('获取账单列表请求失败');
    })
  }
  // 点击每一个类型
  let click = (item: any) => {
    setitems(item)
    setVisible1(false)
    getbillList(dayjs(time).format('YYYY-MM'), item.id)
  }
  // 时间确认
  let onk = (value: any) => {
    setVisible(false)
    if (n === 0) {
      setTime(value)
      getbillList(dayjs(value).format('YYYY-MM'), items.name === '全部类型' ? 'all' : String(items.id))
    } else {
      setDate(value)
    }
  }
  // 点击账单
  let clickItem = ((item: types) => {
    // console.log(item);
    history.push('/detail', { name: item })
  })
  // 编辑页面显示子传父
  let sendVisible = ((val: boolean) => {
    setVisible2(val)
  })
  // 编辑成功
  let onsuccess = ((res: any) => {
    if (res.code === 200) {
      getbillList(dayjs(time).format('YYYY-MM'), items.name === '全部类型' ? 'all' : String(items.id))
    }
  })
  useEffect(() => {
    getList()
    getbillList(dayjs(time).format('YYYY-MM'), items.name === '全部类型' ? 'all' : String(items.id))
  }, [])
  return (
    <div className={`${styles.home} bg-f5f5 flex col`}>
      <div className={`bg-blue ${styles.header}  f12 cw flex col flex-b`}>
        {/* 收入 */}
        <div className={`flex`}>
          <div>总支出：<span className={`mrl-10 f24 ${styles.span}`}>{outlay.toFixed(2)}</span></div>
          <div className={`mrl-10`}>总收入：<span className={`mrl-10 f24 ${styles.span}`}>{income.toFixed(2)}</span></div>
        </div>
        {/* 全部类型 */}
        <div className={`flex flex-r f12`}>
          <div className={`${styles.yinying}`} onClick={() => { setVisible1(true) }}>{items.name}
            <img src={arrow} alt="" className={`${styles.img}`} /></div>
          <div className={`mrl-10 ${styles.yinying}`} onClick={() => { setVisible(true), setN(0) }}>
            {dayjs(time).format('YYYY-MM')}
            <img src={arrow} alt="" className={`${styles.img}`} />
          </div>
        </div>
      </div>
      {/* 占位盒子 */}
      <div className={`div-80`}></div>
      {/* 内容 */}
      <div className={`${styles.content} f16 co-a0a0  pd-10 flex-1`}>
        <div className={`${styles.tianjia} flex flex-c ai-c`}><img src={bianji} alt=""
          className={`${styles.bianji}`} onClick={() => { setVisible2(true) }} /></div>
        {
          list.length === 0 ? <div className={`${styles.null}`}><img src={empty} alt="" className={`${styles.empty}`} />暂无数据</div> :
            // 有数据时显示的列表            
            list.map((item: any, index: number) => {
              let sum = 0
              let sum1 = 0
              item.bills.map((i: any) => {
                i.pay_type === 1 ? sum += Number(i.amount) : sum1 += Number(i.amount)
              })
              return <div key={index} className={`${styles.bill} color-333`}>
                <div className={`${styles.billhead} pd-20`}>
                  <div>{item.date}</div>
                  <div className={`flex ai-c f12`}>
                    <div className={`flex ai-c`}><img src={zhi} alt="" className={`img-20 mrr-10`} />
                      {sum.toFixed(2)}</div>
                    <div className={`mrl-10 flex ai-c`}><img src={shou} alt="" className={`img-20 mrr-10`} />{sum1.toFixed(2)}</div>
                  </div>
                </div>
                {
                  item.bills.map((item1: any, index1: number) => {
                    {
                      iconfonts = icons.find((j: any) => {
                        return j.name === item1.type_name
                      })
                    }
                    return <div className={` bg-fff pd-20 border-b`} key={index1} onClick={() => { clickItem(item1) }}>
                      <div className={`flex flex-b ai-c`} >
                        <div className={`flex ai-c`}>
                          <MyIcon type={iconfonts && iconfonts.info} theme='primary' />
                          <div className={`mrl-10`}>{item1.type_name}</div>
                        </div>
                        <div className={`${item1.pay_type === 1 ? styles.green : styles.red}`}>
                          {item1.pay_type === 1 ? `-${item1.amount}` : `+${item1.amount}`}</div>
                      </div>
                      <div className={`f12 mrt-20`}>{dayjs(Number(item1.date)).format('HH:mm')}</div>
                    </div>
                  })
                }
              </div>
            })
        }
      </div>
      {/* 全部类型弹出层 */}
      <Popup
        visible={visible1}
        direction="bottom"
        onMaskClick={() => { setVisible1(false) }}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div style={{ backgroundColor: '#f5f5f5', height: 500 }}>
          <div style={{ textAlign: 'center', height: 56 }} className={`f14 pr bg-fff flex flex-c ai-c color-666`}>请选择类型
            <div className={`${styles.close}`} onClick={() => { setVisible1(false) }}>×</div>
          </div>
          <div style={{ padding: 20 }} className={`color-333`}>
            <div className={`${styles.btn} flex flex-c ai-c f16 ${items.name === '全部类型' ? styles.activeblue : styles.bgfff}`} onClick={() => { click({ name: '全部类型' }) }}>全部类型</div>
            {/* 支出 */}
            <div className={`mrtb-10`}>支出</div>
            <div className={`flex wrap`}>
              {
                outlayList.map((item: any, index: number) => {
                  return <div key={index} className={`${styles.btn} flex flex-c ai-c f16 ${items.name === item.name ? styles.activeblue : styles.bgfff}`}
                    style={{ marginRight: 9.6, marginBottom: 10 }}
                    onClick={() => { click(item) }}
                  >{item.name}</div>
                })
              }
            </div>
            {/*收入 */}
            <div className={`mrtb-10`}>收入</div>
            <div className={`flex wrap`}>
              {
                incomeList.map((item: any, index: number) => {
                  return <div key={index} className={`${styles.btn} flex flex-c ai-c f16 bg-fff`}
                    style={{ marginRight: 9.6, marginBottom: 10 }}
                    onClick={() => { click(item) }}
                  >{item.name}</div>
                })
              }
            </div>
          </div>
        </div>
      </Popup>
      {/* 日期选择器 */}
      <div>
        <DatePicker
          visible={visible}
          className="test-dateSelect"
          mode={n === 0 ? 'month' : 'datetime'}
          min="1974-05-16"
          defaultValue={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          max={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          value={dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
          onOk={(value: any) => {
            onk(value)
          }}
          onCancel={() => setVisible(false)}
        />
      </div>
      {/* 盒子占位 */}
      <div className={`div-50`}></div>
      {/* 导航栏 */}
      <Tabbars active='/'></Tabbars>
      {/* 编辑弹框 */}
      {/* 弹出框 */}
      {
        visible2 ? <Edit visible={visible2} sendVisible={sendVisible} onsuccess={onsuccess}
        ></Edit> : null
      }
    </div >
  )
}

export default Home
