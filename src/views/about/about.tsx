import React from 'react'
import { NavBar, Icon } from 'zarm';

const About = () => {
  return (
    <div>
      <NavBar
        left={<Icon type="arrow-left" theme="primary" onClick={() => window.history.back()} />}
        title="关于我们"
      />
      <div className={`line`}></div>
      <div className={`pd-20`}>
        <div className={`f18 fw mrtb-10`}>关于项目</div>
        <div className={`lh-2 `}>这个项目的初衷，是想让从事前端开发的同学，进入全栈开发
          的领域。当然，不能说学完本教程你就能胜任任何全栈开发。
          但至少，你已经可以从设计数据库表开始，把自己的一个想法
          转化成实际可见的项目。</div>
        <div className={`f18 fw mrtb-10`}>关于作者</div>
        <div className={`lh-2`}>从2015年实习开始至今，有6年前端开发经验。虽然没有在
          大厂呆过，但是正因如此，我深知奋战在中小厂的前端开发在
          从业1到3年后，会遇到什么瓶颈，小册中也详细的描述了怎
          样从初级到中级的进阶之路。</div>
        <div className={`f18 fw mrtb-10`}>关于小册</div>
        <div className={`lh-2`}>务端采用Node.上层架构Egg.js，前端
          采用React框架+ Zarm移动端组件库。本小册致力于让同学
          们学会服务端的开发流程，从设计数据库到接口的编写，前端
          的接口数据对接和页面制作，再到线上环境的部署。由于本人
          用的是Mac，为了照顾到Windows系统的同学，全程关键步
          骤都会有Windows部分的讲解。</div>
      </div>
    </div>
  )
}

export default About
