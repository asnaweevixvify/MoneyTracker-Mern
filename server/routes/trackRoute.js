const express = require('express')
const router = express.Router()
const {
    create,totalMoney,totalEarn,totalPay,
    getEarnList,getPayList,deleteItem,getOlddata
    ,update,latest
} = require('../controllers/trackControllers')

router.post('/create',create)
router.get('/total',totalMoney)
router.get('/earn',totalEarn)
router.get('/pay',totalPay)
router.get('/earnlist',getEarnList)
router.get('/paylist',getPayList)
router.delete('/delete/:id',deleteItem)
router.get('/olddata/:id',getOlddata)
router.put('/update/:id',update)
router.get('/latest',latest)

module.exports = router