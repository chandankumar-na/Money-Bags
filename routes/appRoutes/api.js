var express = require('express');
var appRouter = express.Router();
var dbHelper = require("./dbHelper.js");

// login api
appRouter.route('/login').post(function (req, res) {
    console.log("/login")
    dbHelper.login(req, function (result) {
        console.log(result)
        res.json(result);
    })
});

// To register user api
appRouter.route('/register').post(function (req, res) {
    console.log("/register")
    dbHelper.register(req, function (result) {
        res.json(result);
    })
});

// To delete ToDo list api
appRouter.route('/addOrUpdateUserTransactionDetails').post(function (req, res) {
    console.log("/addOrUpdateUserTransactionDetails")
    dbHelper.addOrUpdateUserTransactionDetails(req, function (result) {
        res.json(result);
    })
});



// To fetch ToDo list api
appRouter.route('/fetchUserTransactionDetails').post(function (req, res) {
    console.log("/fetchUserTransactionDetails")
    dbHelper.fetchUserTransactionDetails(req, function (result) {
        res.json(result);
    })
});

appRouter.route('/fetchCustomers').post(function (req, res) {
    console.log("/fetchCustomers")
    dbHelper.fetchCustomers(req, function (result) {
        res.json(result);
    })
});
appRouter.route('/addCustomer').post(function (req, res) {
    console.log("/addCustomer")
    dbHelper.addCustomer(req, function (result) {
        res.json(result);
    })
});

appRouter.route('/updateCustomer').post(function (req, res) {
    console.log("/updateCustomer")
    dbHelper.updateCustomer(req, function (result) {
        res.json(result);
    })
});


appRouter.route('/deleteCustomer').post(function (req, res) {
    console.log("/deleteCustomer")
    dbHelper.deleteCustomer(req, function (result) {
        res.json(result);
    })
});


appRouter.route('/addeLoan').post(function (req, res) {
    console.log("/addeLoan")
    dbHelper.addeLoan(req, function (result) {
        res.json(result);
    })
});

appRouter.route('/fetchLoans').post(function (req, res) {
    console.log("/fetchLoans")
    dbHelper.fetchLoans(req, function (result) {
        res.json(result);
    })
});

appRouter.route('/updateLoan').post(function (req, res) {
    console.log("/updateLoan")
    dbHelper.updateLoan(req, function (result) {
        res.json(result);
    })
});


appRouter.route('/deleteLoan').post(function (req, res) {
    console.log("/deleteLoan")
    dbHelper.deleteLoan(req, function (result) {
        res.json(result);
    })
});




//logout
appRouter.get('/logout', function (req, res) {
    console.log("logout api");
    res.json({ success: true, message: 'logout' });
});

module.exports = appRouter;