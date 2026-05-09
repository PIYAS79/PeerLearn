"use client"
import Right_Col from '@/components/UI/Profile_Page/Right_Col'
import { useGetMeQuery } from '@/redux/api/personApi'
import { get_User_Info } from '@/services/auth.services'
import { setToLocalStorage } from '@/utils/local-storage'
import { Avatar, Col, Row } from 'antd'

const Profile_Page = () => {
  const user = get_User_Info()
  const user_email = (user as { email?: string } | null)?.email || ''
  const { data, isLoading } = useGetMeQuery({ email: user_email })
  if(data?.id){
    setToLocalStorage('person_id', data.id);
  }
  return (
    <Row className=''>
      {/* Right */}
      <Col span={18} push={6}>
        {
          data ? <Right_Col p_data={data} /> : <p>Loading...</p>
        }
      </Col>



      {/* Left */}
      <Col span={6} pull={18}>
        <Avatar size={250} src={data?.photo_url || 'https://i.pinimg.com/736x/9e/7b/04/9e7b041059f24da6fdf9182dcd7fe28f.jpg'} />
        <div className='mt-5'>
          <h4><span className='font-bold text-indigo-400'>Name :</span> {data?.first_name} {data?.last_name}</h4>
          <h4><span className='font-bold text-indigo-400'>University :</span> {data?.academicInfo?.university}</h4>
          <h4><span className='font-bold text-indigo-400'>Level :</span> {data?.academicInfo?.level ? data?.academicInfo?.level : 'NULL'} | <span className='font-bold'>Term :</span> {data?.academicInfo?.term ? data?.academicInfo?.term : 'NULL'}</h4>
          <h4><span className='font-bold text-indigo-400'>Department :</span> {data?.academicInfo?.department ? data?.academicInfo?.department : 'Not specified'}</h4>
          <h4><span className='font-bold text-indigo-400'>ID :</span> {data?.academicInfo?.student_id}</h4>
          <h4><span className='font-bold text-indigo-400'>Expertises :</span></h4>
          <div className='mt-2 gap-2'>
            {data?.expertises.length ? data.expertises.map((expertise) => (
              <span key={expertise?.id}
                className='bg-white/5 border border-white/10 rounded-2xl p-2 outline-none text-slate-200 text-[10px]'
              >{expertise?.topic}</span>
            )) : <p>No expertise specified</p>}

          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Profile_Page