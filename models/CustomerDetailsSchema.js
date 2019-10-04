var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var today = Number(new Date())

var CustomerDetailsSchema = new Schema({
    user_id: { type: String, default: "" },
    cust_id: { type: String, default: today },
    cust_name: { type: String, default: "" },
    cust_phone: { type: String, default: "" },
    cust_address: { type: String, default: "" },
    cust_aadhaar: { type: String, default: "" },
    delete_flag: { type: String, default: "N" },
    date:{ type: String, default: new Date()},
    
});
module.exports = mongoose.model('CustomerDetailsSchema', CustomerDetailsSchema);
