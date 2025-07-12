import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [moneyInfo,setMoneyInfo] = useState({
        earn:0,
        pay:0
    })
    const [latestData,setLatestData] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    const {total,earn,pay} = moneyInfo

    async function getMoneyInfo(){
        const [resTotal,resEarn,resPay] = await Promise.all([
            axios.get(`${import.meta.env.VITE_APP_API}/total`),
            axios.get(`${import.meta.env.VITE_APP_API}/earn`),
            axios.get(`${import.meta.env.VITE_APP_API}/pay`)
        ])
        setMoneyInfo({
            total:resTotal.data.total,
            earn:resEarn.data.earn,
            pay:resPay.data.pay
        })
        setIsLoading(false)
    }

    useEffect(()=>{
        getMoneyInfo()
        getLatest()
    },[])

    const getLatest = ()=>{
        axios.get(`${import.meta.env.VITE_APP_API}/latest`)
        .then((res)=>setLatestData(res.data))
        .catch((err)=>console.log(err))
    }

  if(isLoading){
    return(
        <h1 className='load'>กำลังโหลดข้อมูล...</h1>
    )
  }
  else{
    return (
        <div className="home-container">
            <h1 className='title'>Moneytracker-Mernstack</h1>
            <div className="totalAll-box">
                <div className="total-box">
                    <h3>ยอดคงเหลือ</h3>
                    <h1>{total} บาท</h1>
                </div>
                <div className="earnpay-box">
                    <div className="earn-box">
                        <h3>รายรับ</h3>
                        <h1>{earn} บาท</h1>
                    </div>
                    <div className="pay-box">
                        <h3>รายจ่าย</h3>
                        <h1>{pay} บาท</h1>
                    </div>
                </div>
            </div>
            <div className="latest-container">
                <h2>รายการล่าสุด</h2>
                <div className="latest-box">
                    {latestData.map((e,index)=>{
                        return(
                            <ul key={index}>
                                <li><b>ประเภท</b> : {e.type}</li>
                                <li><b>ชื่อรายการ</b> : {e.name}</li>
                                <li><b>จำนวนเงิน</b> : {e.money}</li>
                                <li><b>วันที่ทำรายการ</b> : {e.date}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </div>
      )
  }
}

export default Home