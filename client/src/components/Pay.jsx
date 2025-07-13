import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Pay() {
  const date = new Date()

  const [payData,setpayData] = useState([])
  const [month,setMonth] = useState('none')
  const [year,setYear] = useState(date.getFullYear())
  const [monthList,setMonthList] = useState([])
  const [yearList,setYearList] = useState([])

  const [isLoading,setIsLoading] = useState(true)

  const getPayData = ()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/paylist`,{params:{month,year}})
    .then((res)=>{
      setpayData(res.data)
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  const getDateList = async ()=>{
    const [monthListData,yearListData] = await Promise.all([
      axios.get(`${import.meta.env.VITE_APP_API}/getMonthList`),
      axios.get(`${import.meta.env.VITE_APP_API}/getYearList`)
    ])
    setMonthList(monthListData.data.list)
    setYearList(yearListData.data.list)
  }

  const getFilterMonth = (e)=>{
    setMonth(e.target.value)
  }

  const getFilterYear = (e)=>{
    setYear(e.target.value)
  }

  useEffect(()=>{
    getPayData()
    getDateList()
  },[])

  useEffect(()=>{
    getPayData()
  },[month,year])

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
          <div className="filter">
            <h1 className='titleList'>รายจ่าย</h1>
            <select onChange={getFilterMonth}>
              <option value="" hidden>-- เลือกเดือน --</option>
              {monthList.map((e)=>{
                return(<option value={e}>{e}</option>)
              })}
            </select>
            <select onChange={getFilterYear}>
              <option value="" hidden>-- เลือกปี --</option>
              <option value='none'>ทั้งหมด</option>
              <option value="1">2025</option>
              <option value="2">2026</option>
            </select>
          </div>
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

export default Pay