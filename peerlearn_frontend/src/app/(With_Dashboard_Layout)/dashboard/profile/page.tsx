import Right_Col from '@/components/UI/Profile_Page/Right_Col'
import { Avatar, Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'

const Profile_Page = () => {
  return (
    <Row>
      {/* Right */}
      <Col span={18} push={6}>
        <Right_Col />
      </Col>



      {/* Left */}
      <Col span={6} pull={18}>
        <Avatar size={250} src={'https://i.pinimg.com/736x/9e/7b/04/9e7b041059f24da6fdf9182dcd7fe28f.jpg'} />
        <div className='mt-5'>
          <h4>Name : Jannatul Ferdaus Sumaiya</h4>
          <h4>Department : Computer Science and Engineering</h4>
          <h4>Expertise: </h4>
          <div className='mt-2 gap-2'>
            <span
              className='bg-white/5 border border-white/10 rounded-2xl p-2 outline-none text-slate-200 text-[10px]'
            >Discrete Math</span>
            <span
              className='bg-white/5 border border-white/10 rounded-2xl p-2 outline-none text-slate-200 text-[10px]'
            >Data Structures</span>

          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Profile_Page