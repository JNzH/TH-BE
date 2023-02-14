const express = require('express')
const router = express.Router()

const dbcontroller = require('../controller/dbcontroller')

router.get("/bill", (req, res) => {
    res.send(dbcontroller.dbShowAllBill())
    console.log(`Show all bills`)
})

router.post("/bill", (req, res) => {
    const result = dbcontroller.dbInsertBill(req.body)
    res.status(result.status)
    if (result.status == 200) {
        res.send("Insert successful")
        console.log(`Insert ${JSON.stringify(req.body)}`)
    } else {
        res.send(result.errors)
        console.log(`Insert error`)
    }
})

module.exports = router