var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var today=Number(new Date())

var UserDetailsSchema = new Schema({
    user_id: { type:String,default:today ,unique: true},
    user_name: { type: String, default: "" },
    user_password: { type: String, default: "" },
    user_phone:{ type: String, default: "" },
    user_email:{ type: String, default: "" },
    delete_flag:{type:String,default:"N"}
});
module.exports = mongoose.model('UserDetailsSchema', UserDetailsSchema);
