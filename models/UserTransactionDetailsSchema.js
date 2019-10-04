var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var today=Number(new Date())

var UserTransactionDetailsSchema = new Schema({
    user_id: { type:String,default:""},
    user_tran_id: { type: String,  default:today},

    user_capital_amount_actual: { type: Number, default: 0},
    user_capital_amount_profit: { type: Number, default: 0},
    user_capital_amount_total: { type: Number, default: 0 },
    
    user_in_hand_cash:{ type: Number, default: 0 },

    user_capital_amount_date:{ type: String, default: "" },
    user_get_owes_amount:{ type: Number, default: 0},
    user_profit_amount:{ type: Number, default:0 },
    user_expenditure_amount:{ type: Number, default: 0 },
  

    delete_flag:{type:String,default:"N"}
});
module.exports = mongoose.model('UserTransactionDetailsSchema', UserTransactionDetailsSchema);
