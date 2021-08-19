import React, { useState, useEffect } from 'react'
import { TabBar, Icon } from 'zarm';
import { useHistory } from 'react-router-dom'

interface props {
  active: string
}

const Tabbars = (prop: props) => {
  const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2747914_c5s56z3tlpj.js');
  const [activeKey, setActiveKey] = useState(prop.active);
  let history = useHistory()
  useEffect(() => {
    activeKey === '/' ? history.push(`${activeKey}`) : history.push(`/${activeKey}`)
  }, [activeKey])
  return (
    <div>
      {/* tabbar */}
      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        <TabBar.Item itemKey="/" title="账单" icon={<TabIcon type="icon-zhangdan" />} />
        <TabBar.Item
          itemKey="data"
          title="统计"
          icon={<TabIcon type="icon-tongji" />}
        />
        <TabBar.Item
          itemKey="user"
          title="我的"
          icon={<TabIcon type="icon-yonghu" />}
        />
      </TabBar>
    </div >
  )
}

export default Tabbars
