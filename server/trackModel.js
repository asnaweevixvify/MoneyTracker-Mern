const mongoose = require('mongoose')

// ชื่อรายการ จำนวนเงิน ประเภทรายการ เดือน ปี
const trackSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    money:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('tracker',trackSchema)