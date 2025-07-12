//โมดูลคำนวณยอดคงเหลือ
module.exports.calTotal = (money)=>{
    const earn = money.filter(e=>e.type==='รายรับ').map(e=>e.money)
    .reduce((sum,num)=>sum+num,0)

    const pay = money.filter(e=>e.type==='รายจ่าย').map(e=>e.money)
    .reduce((sum,num)=>sum+num,0)

    const result = earn - pay
    const resultFormat = Intl.NumberFormat().format(result)

    return resultFormat
}

//โมดูลคำนวณรายรับ
module.exports.calEarn = (money)=>{
    const totalEarn = money.filter(e=>e.type==='รายรับ').map(e=>e.money)
    .reduce((sum,num)=>sum+num,0)
    const result = Intl.NumberFormat().format(totalEarn)
    return result
}

//โมดูลคำนวณรายจ่าย
module.exports.calPay = (money)=>{
    const totalPay = money.filter(e=>e.type==='รายจ่าย').map(e=>e.money)
    .reduce((sum,num)=>sum+num,0)
    const result = Intl.NumberFormat().format(totalPay)
    return result
}