const moment = require('moment')
const validateBill = require('../models/bill').validateBill

let data = require('../database/db.json')

module.exports = {
    dbInsertBill: async function(bill) {
        var errors = validateBill(bill)
        if (errors.length == 0) {
            data.push(bill)
            return {
                "status": 200
            }
        } else {
            return {
                "status": 500,
                "errors": errors
            }
        }
    },
    dbShowAllBill: async function() {
        return JSON.stringify(data)
    }
};