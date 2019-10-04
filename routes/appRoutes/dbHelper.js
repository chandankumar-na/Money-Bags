
var CustomerDetailsSchema = require('../../models/CustomerDetailsSchema');
var UserDetailsSchema = require('../../models/UserDetailsSchema');


var UserTransactionDetailsSchema = require('../../models/UserTransactionDetailsSchema');
var CustomerTransactionDetailsSchema = require('../../models/CustomerTransactionDetailsSchema');

var self = module.exports = {

    login: function (req, callback) {
        console.log(req.body)
        UserDetailsSchema.findOne({ $and: [{ $or: [{ user_email: req.body.user_email }, { user_phone: req.body.user_phone }] }, { user_password: req.body.user_password }] },
            function (err, result) {
                if (err) {
                    console.log(error)
                    return callback(err);
                } else {
                    console.log("result", result)
                    if (result != null) {
                        console.log("result",result)
                        return callback({ 'user_id': result.user_id ,'user_name': result.user_name });
                    } else {
                        return callback(null);
                    }

                }
            });
    },
    register: function (req, callback) {
        console.log(req.body);
        UserDetailsSchema.findOne({ $or: [{ user_email: req.body.user_email }, { user_phone: req.body.user_phone }] },
            function (err, result1) {
                if (err) {
                    console.log(error)
                    return callback(err);
                } else {
                    if (result1 == null) {
                        console.log("No user exist inset data", result1)
                        var userDetailsSchema = new UserDetailsSchema({
                            user_id: req.body.user_id,
                            user_name: req.body.user_name,
                            user_password: req.body.user_password,
                            user_phone: req.body.user_phone,
                            user_email: req.body.user_email
                        })

                        userDetailsSchema.save(function (err, result) {
                            if (err) {
                                return callback(err);
                            } else {
                                return callback(result);
                            }

                        });

                    } else {
                        console.log("not null user already exist", result1)
                        return callback(null);
                    }//esle2


                }//else1
            });
    },
    // add or update
    addOrUpdateUserTransactionDetails: function (req, callback) {
        console.log("body>>>", req.body)

        var userTransactionDetailsSchema_json = {
            user_id: req.body.user_id,
            user_capital_amount_actual: req.body.user_capital_amount_actual,
            user_capital_amount_profit: req.body.user_capital_amount_profit,

            user_capital_amount_total: req.body.user_capital_amount_actual + req.body.user_capital_amount_profit,
           
            user_capital_amount_date: req.body.user_capital_amount_date,
            
            user_get_owes_amount: req.body.user_get_owes_amount,
            user_profit_amount: req.body.user_capital_amount_profit,
            user_expenditure_amount: req.body.user_expenditure_amount,
            user_in_hand_cash: req.body.user_in_hand_cash,

        };

        let query = { delete_flag: "N", user_id: req.body.user_id }

        UserTransactionDetailsSchema.findOneAndUpdate(query, { $set: userTransactionDetailsSchema_json },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    if (result) {
                        return callback({ status: "Updated" });
                    } else {

                        userTransactionDetailsSchema_json.user_tran_id = req.body.user_tran_id;

                        var userTransactionDetailsSchema = new UserTransactionDetailsSchema(userTransactionDetailsSchema_json)
                        userTransactionDetailsSchema.save(function (err, result) {
                            if (err) {
                                return callback(err);
                            } else {
                                if (result) {
                                    return callback({ status: "Addedd" });
                                }
                            }

                        });
                    }//else2

                }//else1

            });
    },

    fetchUserTransactionDetails: function (req, callback) {
        console.log("body=>", req.body)
        var query = { delete_flag: "N", user_id: req.body.user_id }
        UserTransactionDetailsSchema.find(query,
            function (err, result) {
                if (err) {
                    console.log("error=>", err)
                    return callback(err);
                } else {
                    console.log("db result=>", result)
                    return callback(result);
                }
            });
    },

    //customer
    fetchCustomers: function (req, callback) {
        console.log(req.body)
        let query = { user_id: req.body.user_id }
        CustomerDetailsSchema.find(query,
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    return callback(result);
                }
            });
    },

    addCustomer: function (req, callback) {
        console.log(req.body)

        custTransactionDetailsSchema_json = {
            user_id: req.body.user_id,
            cust_id: req.body.cust_id,
            cust_name: req.body.cust_name,
            cust_phone: req.body.cust_phone,
            cust_aadhaar: req.body.cust_aadhaar,
            cust_address: req.body.cust_address,
        }

        var userTransactionDetailsSchema = new CustomerDetailsSchema(custTransactionDetailsSchema_json)
        userTransactionDetailsSchema.save(function (err, result) {
            if (err) {
                return callback(err);
            } else {
                if (result) {
                    return callback({ status: "Addedd" });
                }
            }

        });
    },


    updateCustomer: function (req, callback) {
        console.log("body==>", req.body)
        var update_json = {
            cust_name: req.body.cust_name,
            cust_phone: req.body.cust_phone,
            cust_aadhaar: req.body.cust_aadhaar,
            cust_address: req.body.cust_address,
        }
        CustomerDetailsSchema.findOneAndUpdate({ cust_id: req.body.cust_id }, { $set: update_json },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log("result==>", result)
                    return callback(result);
                }
            });
    },

    deleteCustomer: function (req, callback) {
        CustomerDetailsSchema.remove({ cust_id: req.body.cust_id },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(result);
                }
            });
    },




    addeLoan: function (req, callback) {
        console.log(req.body)


        customerTransactionDetailsSchema_json = {
            user_id: req.body.user_id,
            cust_id: req.body.cust_id,
            cust_name: req.body.cust_name,
            cust_tran_id: req.body.cust_tran_id,
            cust_tran_amount: req.body.cust_tran_amount,
            cust_tran_monthly_amount: req.body.cust_tran_monthly_amount,
            cust_tran_total_instalments: req.body.cust_tran_total_instalments,
            cust_tran_paid_instalments: req.body.cust_tran_paid_instalments,
            cust_tran_interest: req.body.cust_tran_interest,
            cust_tran_date: req.body.cust_tran_date,
            cust_tran_start_date: req.body.cust_tran_start_date,
            cust_tran_end_date: req.body.cust_tran_end_date,
            cust_tran_instalment_dates: req.body.cust_tran_instalment_dates,
            cust_tran_paid_flags: req.body.cust_tran_paid_flags,
            cust_tran_balance: req.body.cust_tran_amount,
            cust_tran_ip_address: req.body.cust_tran_ip_address
        }

        var customerTransactionDetailsSchema = new CustomerTransactionDetailsSchema(customerTransactionDetailsSchema_json)
        customerTransactionDetailsSchema.save(function (err, result) {
            if (err) {
                return callback(err);
            } else {
                if (result) {
                    return callback({ status: "Addedd" });
                }
            }

        });
    },

    fetchLoans: function (req, callback) {
        console.log(req.body)
        let query = { user_id: req.body.user_id }
        CustomerTransactionDetailsSchema.find(query,
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    return callback(result);
                }
            });
    },

    updateLoan: function (req, callback) {
        console.log("updateLoan,body==>", req.body)
        var update_json = {
            cust_tran_paid_instalments: req.body.cust_tran_paid_instalments,
            cust_tran_instalment_dates: req.body.cust_tran_instalment_dates,
            cust_tran_paid_flags: req.body.cust_tran_paid_flags,
            cust_tran_balance: req.body.cust_tran_balance,
            cust_tran_ip_address: req.body.cust_tran_ip_address
        }

        CustomerTransactionDetailsSchema.findOneAndUpdate({ cust_tran_id: req.body.cust_tran_id }, { $set: update_json },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log("result==>", result)
                    //after updation on CustomerTransactionDetailsSchema ,now updating UserTransactionDetailsSchema
                    return callback(result);
                }
            });
    },


    // UpdateUserTransactionDetails:function(req,callback){

    //     var userTransactionDetailsSchema_json = {
    //         user_id: req.body.user_id,
    //         user_capital_amount_actual: req.body.user_capital_amount_actual,
    //         user_capital_amount_profit: req.body.user_capital_amount_profit,
    //         user_capital_amount_total: req.body.user_capital_amount_total,

    //         // user_capital_amount_date: req.body.user_capital_amount_date,

    //         // user_get_owes_amount: req.body.user_get_owes_amount,
    //         // user_get_owes_amount: req.body.user_get_owes_amount,

    //         // user_profit_amount: req.body.user_profit_amount,
    //         // user_expenditure_amount: req.body.user_expenditure_amount,
    //         // user_in_hand_cash: req.body.user_in_hand_cash,

    //     };

    //     let query = { delete_flag: "N", user_id: req.body.user_id }
    //     UserTransactionDetailsSchema.findOneAndUpdate(query, { $set: userTransactionDetailsSchema_json },
    //         function (err, result) {
    //             if (err) {
    //                 return callback(err);
    //             } else {
    //                 console.log(result)
    //                 if (result) {
    //                     return callback({ status: "Updated" });
    //                 } else {
    //                     return callback({ status: "Not Updated" });
    //                 }//else2

    //             }//else1

    //         });



    // },


    deleteLoan: function (req, callback) {
        CustomerTransactionDetailsSchema.remove({ cust_tran_id: req.body.cust_tran_id },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(result);
                }
            });
    },


}