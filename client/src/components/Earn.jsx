import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Earn() {
  const date = new Date()

  const [earnData,setearnData] = useState([])
  const [month,setMonth] = useState('none')
  const [year,setYear] = useState(date.getFullYear())

  const [isLoading,setIsLoading] = useState(true)

  const getEarnData = ()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/earnlist`,{params:{month,year}})
    .then((res)=>{
      setearnData(res.data)
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getEarnData()
  },[])

  const confirmDel= (id)=>{
    Swal.fire({
      title: "ต้องการลบรายการหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบรายการ",
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        delItem(id)
      }
    });
  }

  const delItem = (id)=>{
    axios.delete(`${import.meta.env.VITE_APP_API}/delete/${id}`)
    .then(()=>{
      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        icon: "success"
      });
    })
    .catch((err)=>console.log(err))
  }

  if(isLoading){
    return(
      <h1 className='load'>กำลังโหลดข้อมูล...</h1>
    )
  }
  else{
    return (
      <div className="list-container">
          <h1 className='title'>รายรับ</h1>
          <ul className='topic'>
              <li>ชื่อรายการ</li>
              <li>จำนวนเงิน</li>
              <li>วันที่ทำรายการ</li>
              <li>ลบ/แก้ไข</li>
          </ul>
          {earnData.map((e,index)=>{
            return(
              <ul className='list' key={index}>
                <li>{e.name}</li>
                <li>{e.money}</li>
                <li>{e.date}</li>
                <li className='icon'>
                  <i className="fa-solid fa-trash fa-1x" onClick={()=>confirmDel(e._id)}></i>
                  <Link to={`/edit/${e._id}`}><i className="fa-solid fa-pen fa-1x"></i></Link>
                </li>
              </ul>
            )
          })}
      </div>
    )
  }
}

export default Earn