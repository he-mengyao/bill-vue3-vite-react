import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Tabbars from '../../components/tabbars/tabbars';
import styles from '../../App.module.scss'
import dayjs from '_dayjs@1.10.6@dayjs';
import api from '../../http/api';
import { Icon, DatePicker, Progress } from 'zarm';
import * as echarts from "echarts";
import { iicons, oicons } from '../../utils/index'

interface Obj {
  total_data: []
  total_expense: string
  total_income: string
}
interface Icons {
  info: string
  name: string
}
interface CountObj {
  value: number,
  name: string,
}
const Data = () => {
  const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747914_d9d32hsui6m.js');
  let [time, setTime] = useState(dayjs().format('YYYY-MM'))
  let [visible, setVisible] = useState(false)
  let [data, setData] = useState<Obj | null>(null)
  let [list, setList] = useState([])
  let [countList, setcountList] = useState<CountObj[]>([])
  // 判断收入还是支出
  let [n, setN] = useState(1)
  // 统计表支出显示
  let [n1, setN1] = useState(1)
  let [oneicon, setOneicon] = useState<Icons>()
  const chartDom = document.getElementById('charts')!
  // 饼图数据
  let getData = (n: number, d: string) => {
    api.getBilldata({ date: d }).then((res: any) => {
      if (res.code === 200) {
        setData(res.data)
        let arr = res.data.total_data.filter((item: any) => {
          if (n === 1) {
            return item.pay_type === 1
          } else {
            return item.pay_type === 2
          }
        }).map((item1: any) => {
          return {
            value: item1.number,
            name: item1.type_name,
          }
        })
        setN1(n)
        setCharts(arr)
      }
    }).catch((err) => {
      console.log('数据统计请求失败');
    })
  }
  // 时间确认
  let timeok = (value: any) => {
    setTime(value)
    setVisible(false)
    getData(n1, dayjs(value).format('YYYY-MM'))
  }

  let setCharts = (data: any) => {
    let charts = echarts.init(chartDom!)
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    charts && charts.setOption(option)
  }

  useEffect(() => {
    getData(1, time)
  }, [chartDom])

  return (
    <div className={`bg-f5f5`}>
      <div className={`${styles.total} bg-fff flex col ai-c`}>
        {/* 日期 */}
        <div className={`${styles.date} flex ai-c flex-b f14`} onClick={() => { setVisible(true) }}>
          {dayjs(time).format('YYYY-MM')}
          <div className={`color-a0a0`}>|</div>
          <MyIcon type="icon-rili" theme="default" size='sm' />
        </div>
        {/* 支出和收入 */}
        <div className={`color-blue mrt-20`}>共支出</div>
        <div className={`color-blue mrt-10 f24`}>￥{data && data.total_expense}</div>
        <div className={`mrt-20 color-333`}>共收入￥{data && data.total_income}</div>
      </div>
      <div className={`mrt-10 bg-fff pd-10`}>
        {/* 收支构成 */}
        <div className={`flex ai-c flex-b`}>
          <div className={`f18`}>收支构成</div>
          <div className={` flex ai-c`}>
            <div onClick={() => setN(1)} className={`${n === 1 ? styles.active : ''} mrr-10 ${styles.tagg}`}>支出</div>
            <div onClick={() => setN(2)} className={`${n === 2 ? styles.warning1 : ''} ${styles.tagg}`}>收入</div>
          </div>
        </div>
        {/* 支出明细 */}
        <div className={`mrt-20`}>
          {
            data && data.total_data.sort((a: any, b: any) => { return b.number - a.number }).filter((item: any) => {
              return item.pay_type === n
            }).map((item1: any, index: number) => {
              {
                oneicon = (iicons.concat(oicons).find((item2: any) => {
                  return item2.name === item1.type_name
                }))
              }
              return <div className={`mrtb-10`} key={index}>
                <div className="progress flex flex-b ai-c">
                  <MyIcon type={oneicon?.info} theme={n === 1 ? 'primary' : 'warning'} size="lg" />
                  <div className={`mrrl-10`} style={{ width: 40 }}>{item1.type_name}</div>
                  <div className={`mrr-10`}>￥{(item1.number).toFixed(2)}</div>
                  <Progress
                    shape="line"
                    percent={Number((n === 1 ? item1.number / Number(data?.total_expense) * 100 : item1.number / Number(data?.total_income) * 100).toFixed(2))}
                    theme='primary'
                    strokeShape='round'
                  />
                </div>
              </div>
            })

          }
        </div>
        {/* 统计表 */}
        <div className={`mrt-20`}>
          {/* 收支构成 */}
          <div className={`flex ai-c flex-b`}>
            <div className={`f18`}>收支构成</div>
            <div className={` flex ai-c`}>
              <div onClick={() => { getData(1, time) }} className={`${n1 === 1 ? styles.active : ''} mrr-10 ${styles.tagg}`}>支出</div>
              <div onClick={() => { getData(2, time) }} className={`${n1 === 2 ? styles.warning1 : ''} ${styles.tagg}`}>收入</div>
            </div>
          </div>
          <div id='charts' style={{ height: 300, width: '100%', marginTop: 20 }}></div>
        </div>
      </div>
      {/* 时间选择器 */}
      <DatePicker
        visible={visible}
        mode="month"
        value={dayjs().format('YYYY-MM')}
        DefaultValue={dayjs().format('YYYY-MM')}
        onOk={(value: any) => {
          timeok(value)
        }}
        onCancel={() => setVisible(false)}
      />
      {/* tabbar */}
      <Tabbars active='data'></Tabbars>
    </div>
  )
}

export default Data
