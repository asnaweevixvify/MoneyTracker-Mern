import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

function Edit() {
  const [data,setData] = useState({name:'',money:0,type:'',date:'',month:'',year:''})
  const {name,money,date} = data
  const param = useParams()

  const getOldData = ()=>{
    axios.get(`${import.meta.env.VITE_APP_API}/olddata/${param.id}`)
    .then((res)=>{
      setData(res.data.olddata)
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getOldData()
  },[])

  const inputValue = (topic)=>{
    return (e)=>{
      if(topic === 'date'){
        const date = e.target.value
        const dateSave = new Date(date)
        const month = dateSave.getMonth()+1
        const year = dateSave.getFullYear()
        setData({...data,date,month,year})
      }
      else{
        setData({...data,[topic]:e.target.value})
      }
    }
  }

  const sendData = (e)=>{
    e.preventDefault()
    axios.put(`${import.meta.env.VITE_APP_API}/update/${param.id}`,data)
    .then(()=>{
      Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ",
        icon: "success",
        draggable: true
      });
      setData({...data,name:'',money:0,date:''})
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div className="form-container">
        <h1 className='title'>แก้ไขรายการ</h1>
        <form onSubmit={sendData}>
          <select onChange={inputValue('type')}>
            <option hidden>เลือกประเภทรายการ</option>
            <option>รายรับ</option>
            <option>รายจ่าย</option>
          </select>
            <h3>ชื่อรายการ</h3>
            <input type='text' onInput={inputValue('name')} value={name}></input>
            <h3>จำนวนเงิน</h3>
            <input type='text' onInput={inputValue('money')} value={money}></input>
            <h3>วันที่ทำรายการ</h3>
            <input type='date' onChange={inputValue('date')} value={date}></input>
            <button type='submit'>อัพเดทรายการ</button>
        </form>
    </div>
  )
}

export default Edit