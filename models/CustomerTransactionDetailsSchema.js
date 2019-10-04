var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise 


var today = new Date();
var start_date = new Date();
start_date.setDate(today.getDate()+1);

var end_date=new Date();
end_date.setDate(today.getDate()+100);



var CustomerTransactionDetailsSchema = new Schema({
    
    user_id: { type:String,default: "" },
    cust_id: { type: String,default: "" },
    cust_name: { type: String, default: "" },
    cust_tran_id: { type: String, default: "" },
    cust_tran_date:{ type: Date, default: today },
    cust_tran_start_date:{ type: Date, default: start_date },
    cust_tran_end_date:{ type: Date, default: end_date },
    cust_tran_amount:{ type: Number, default: 0 },
    cust_tran_monthly_amount: { type: Number, default: 0 },
    cust_tran_total_instalments:{ type: Number, default: 100 },
    cust_tran_paid_instalments:{ type: Number, default: 0 },
    cust_tran_instalment_dates:{type:[] ,default:[]},
    cust_tran_ip_address:{type:[] ,default:[]},
    cust_tran_paid_flags:{type:[] ,default:[]},
    cust_tran_interest:{ type: Number, default: 0},
    cust_tran_balance:{ type: Number, default: 0},
    delete_flag:{type:String,default:"N"}

});
module.exports = mongoose.model('CustomerTransactionDetailsSchema', CustomerTransactionDetailsSchema);