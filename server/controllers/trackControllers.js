const express = require('express')
const mongoose = require('mongoose')
const Track = require('../trackModel')
const {calTotal,calEarn,calPay,getMonthListMod,getYearListMod} = require('../modules/module')

//สร้างรายการ
module.exports.create = (req,res)=>{
    const data = req.body
    Track.create(data)
    .then(()=>res.json({msg:"บันทึกข้อมูลสำเร็จ"}))
    .catch((err)=>res.status(400).json({error:err}))
}

//คำนวณยอดคงเหลือ
module.exports.totalMoney = (req,res)=>{
    Track.aggregate([{$project:{money:1,_id:0,type:1}}])
    .then((money)=>{
        res.json({
            total:calTotal(money)
        })
    })
    .catch((err)=>res.status(400).json({error:err}))
}

//คำนวณรายรับ
module.exports.totalEarn = (req,res)=>{
    Track.aggregate([{$project:{money:1,_id:0,type:1}}])
    .then((money)=>{
        res.json({
            earn:calEarn(money)
        })
    })
    .catch((err)=>res.status(400).json({error:err}))
}

//คำนวณรายจ่าย
module.exports.totalPay = (req,res)=>{
    Track.aggregate([{$project:{money:1,_id:0,type:1}}])
    .then((money)=>{
        res.json({
            pay:calPay(money)
        })
    })
    .catch((err)=>res.status(400).json({error:err}))
}

//ส่งรายการรายรับ
module.exports.getEarnList = (req,res)=>{
    const {month,year} = req.query
    if(month === 'none'){
        Track.find({year,type:'รายรับ'})
        .then((data)=>res.json(data))
        .catch((err)=>res.status(400).json({error:err}))
    }
    else{
        Track.find({month,year,type:'รายรับ'})
        .then((data)=>res.json(data))
        .catch((err)=>req.status(400).json({error:err}))
    }
}

//ส่งรายการรายจ่าย
module.exports.getPayList = (req,res)=>{
    const {month,year} = req.query
    if(month === 'none'){
        Track.find({year,type:'รายจ่าย'})
        .then((data)=>res.json(data))
        .catch((err)=>res.status(400).json({error:err}))
    }
    else{
        Track.find({month,year,type:'รายจ่าย'})
        .then((data)=>res.json(data))
        .catch((err)=>req.status(400).json({error:err}))
    }
}

//ลบข้อมูล
module.exports.deleteItem = (req,res)=>{
    const id = req.params.id
    Track.findOneAndDelete({_id:id})
    .then(()=>res.json({msg:'ลบข้อมูลสำเร็จ'}))
    .catch((err)=>res.status(400).json({error:err}))
}

//นำข้อมูลเก่าไปแสดงในฟอร์มแก้ไขรายการ
module.exports.getOlddata = (req,res)=>{
    const id = req.params.id
    Track.findOne({_id:id})
    .then((olddata)=>res.json({olddata}))
    .catch((err)=>res.status(400).json({error:err}))
}

//อัพเดทข้อมูล
module.exports.update = (req,res)=>{
    const id = req.params.id
    const newData = req.body
    Track.findOneAndUpdate({_id:id},newData)
    .then(()=>res.json({msg:'แก้ไขข้อมูลเรียบร้อย'}))
    .catch((err)=>res.status(400).json({error:err}))
}

//ส่งรายการล่าสุด 5 รายการ
module.exports.latest = (req,res)=>{
    Track.aggregate([{$sort:{date:-1}},{$limit:3}])
    .then((data)=>res.json(data))
    .catch((err)=>res.status(400).json({error:err}))
}

//ดึงค่าเดือนจากทุกรายการ
module.exports.getMonthList = (req,res)=>{
    Track.aggregate([{$sort:{month:1}},{$project:{_id:0,month:1}}])
    .then((data)=>res.json({list:getMonthListMod(data)}))
    .catch((err)=>console.log(err))
}

//ดึงค่าปีจากทุกรายการ
module.exports.getYearList = (req,res)=>{
    Track.aggregate([{$sort:{year:1}},{$project:{_id:0,year:1}}])
    .then((data)=>res.json({list:getYearListMod(data)}))
    .catch((err)=>console.log(err))
}