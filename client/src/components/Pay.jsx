import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Pay() {
  const date = new Date()

  const [payData,setpayData] = useState([])
  const [month,setMonth] = useState('none')
  const [year,setYear] = useState(date.getFullYear())

  const [isLoading,setIsLoading] = useState(true)

  const getPayData = ()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/paylist`,{params:{month,year}})
    .then((res)=>{
      setpayData(res.data)
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getPayData()
  },[])

  if(isLoading){
    return(
      <h1 className='load'>กำลังโหลดข้อมูล...</h1>
    )
  }
  else{
    return (
      <div className="list-container">
          <h1 className='title'>รายจ่าย</h1>
          <ul className='topic'>
              <li>ชื่อรายการ</li>
              <li>จำนวนเงิน</li>
              <li>วันที่ทำรายการ</li>
              <li>ลบ/แก้ไข</li>
          </ul>
          {payData.map((e,index)=>{
            return(
              <ul className='list' key={index}>
                <li>{e.name}</li>
                <li>{e.money}</li>
                <li>{e.date}</li>
                <li className='icon'>
                  <i className="fa-solid fa-trash fa-1x"></i>
                  <Link to={`/edit/${e._id}`}><i className="fa-solid fa-pen fa-1x"></i></Link>
                </li>
              </ul>
            )
          })}
      </div>
    )
  }
}

export default Pay