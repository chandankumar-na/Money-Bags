var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise 


var today = new Date();
var start_date = new Date();
start_date.setDate(today.getDate()+1);

var end_date=new Date();
end_date.setDate(today.getDate()+100);

var LoanDetailsSchema = new Schema({
    
    user_id: { type:String,default: "" },
    cust_id: { type: String,default: "" },
    cust_tran_id: { type: String, default: "" },
    loan_date: { type: String, default: "" },
    loan_amount: { type: Number, default: 0},
    loan_pay_flag: { type: String, default: "Pay" },

    
    delete_flag:{type:String,default:"N"}

});
module.exports = mongoose.model('LoanDetailsSchema', LoanDetailsSchema);