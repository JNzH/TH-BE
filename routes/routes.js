const express = require('express')
const router = express.Router()

const dbcontroller = require('../controller/dbcontroller')

router.get("/bill", async (req, res) => {
    res.send(await dbcontroller.dbShowAllBill())
    console.log(`Show all bills`)
})

router.post("/bill", async (req, res) => {
    const result = await dbcontroller.dbInsertBill(req.body)
    res.status(result.status)
    if (result.status == 200) {
        res.send("Insert bill successful")
        console.log(`Insert ${JSON.stringify(req.body)}`)
    } else {
        res.send(`Insert bill failed: ${result.errors}`)
        console.log(`Insert bill failed: ${result.errors}`)
    }
})

module.exports = router