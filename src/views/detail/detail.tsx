import React, { useEffect, useState } from 'react'
import { NavBar, Icon, Button, Modal, Cell, Toast } from 'zarm';
import styles from '../../App.module.scss'
import { useLocation, useHistory } from 'react-router-dom'
import api from '../../http/api';
import dayjs from '_dayjs@1.10.6@dayjs';
import Edit from '../../components/edit/edit';
import { icons } from '../../utils';
interface Obj {
  amount: string
  date: string
  id: number
  pay_type: number
  remark: string
  type_id: number
  type_name: string
  user_id: number
}

const Detail = () => {
  const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747914_i4ny2lrytj.js');
  let location = useLocation()
  let history = useHistory()
  let [data, setdata] = useState<Obj | null>(null)
  let [iconfonts, seticonfonts] = useState<any>()
  // 编辑弹出层显示
  let [visible, setVisible] = useState(false)
  // 图标
  let getData = (ids: any) => {
    api.getDetail({ id: ids }).then((res: any) => {
      if (res.code === 200) {
        setdata(res.data)
        // console.log(res.data);
        seticonfonts(icons.find((j: any) => {
          return j.name === res.data.type_name
        }))
      }
    }).catch(() => {
      console.log('账单详情请求失败');
    })
  }
  // 删除账单的请求
  let del = () => {
    api.delBill({ id: String(data?.id) }).then((res: any) => {
      // console.log(res);
      if (res.code === 200) {
        Toast.show('删除成功')
        history.push('/')
      }
    }).catch(() => {
      console.log('删除账单请求失败');
    })
  }
  // 弹出层显示
  let sendVisible = ((val: boolean) => {
    setVisible(val)
  })
  // 编辑成功
  let onsuccess = ((res: any, id: number) => {
    console.log(res);
    if (res.code === 200) {
      Toast.show('修改成功')
      getData(id)
      console.log(id);
    }
  })
  useEffect(() => {
    let id = (location.state as any).name.id
    getData(id)
  }, [])
  return (
    <div className={`bg-f5f5 ${styles.home}`}>
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="账单详情"
      />
      <div className={`${styles.detail} pd-20 f14`}>
        <div className={`flex flex-c ai-c`}>
          <MyIcon type={iconfonts && iconfonts.info} theme={data && data.pay_type === 2 ? 'warning' : 'primary'} />
          <div className={`mrl-10`}>{iconfonts && iconfonts.name}</div>
        </div>
        {
          data ? <div>
            <div className={`flex flex-c f24 fw mrtb-10`}>{(data.pay_type === 1 ? -data.amount : +data.amount).toFixed(2)}</div>
            <div className={`flex `}>
              <div className={`w-40`}>记录时间</div>
              <div style={{ marginLeft: 30 }}
              > {dayjs(Number(data.date)).format('YYYY-MM-DD HH:mm')}</div></div>
            <div className={`flex mrt-20`}>
              <div className={` w-40`}>备注</div>
              <div style={{ marginLeft: 30 }}>{data.remark === '' ? "-" : data.remark}</div></div>
            <div className={`flex ai-c flex-a mrt-20 f16`}>
              <div onClick={() => {
                const modal = Modal.confirm({
                  title: '确认信息',
                  content: '确认删除账单？',
                  onOk: () => {
                    del()
                  },
                });
              }} ><MyIcon type='icon-shanchu' theme='danger' />删除</div>
              <div onClick={() => setVisible(true)}><MyIcon type='icon-bianji1' theme='default' />编辑</div>
            </div>
          </div> : null
        }
      </div>
      {/* 弹出框 */}
      {
        visible ? <Edit visible={visible} data={data && data} sendVisible={sendVisible}
          onsuccess={onsuccess}
        ></Edit> : null
      }
    </div >
  )
}

export default Detail
