const chai = require('chai')

const chaiHTTP = require('chai-http')
const { describe, it } = require('mocha')
const { post } = require('./routes/routes')
const validateBill = require('./models/bill').validateBill
const axios = require('axios')

const API_URL = "http://localhost:3000/api"
const expect = chai.expect;

chai.use(chaiHTTP)

describe('API Tests', () => {

    describe('GET Method API test, expected response an array of bills', () => {
        it("Get all bills", async () => {
            const response = await axios.get(API_URL + "/bill");
            expect(response.status).to.be.equal(200);
            expect(response.data).to.be.an("array");
            response.data.forEach((data) => {
                expect(validateBill(data)).to.be.empty
            });
        });
    });

    describe('POST Method API test', () => {
        it('POST a valid bill, response 200', async() => {
            const validInfo = {
                        "patientName": "Ivy",
                        "patientAddress": "34 Olive St, NY",
                        "hospitalName": "Ella Hospital",
                        "dateOfService": "2024-02-01",
                        "billAmount": 22.33
                    };
            const response = await axios.post(API_URL + "/bill", validInfo);
            expect(response.status).to.be.equal(200);
            expect(response.data).to.be.equal("Insert bill successful");
        });

        it('POST a empty invalid bill, response 500', async() => {
            try {
                const invalidInfo = {};
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("name");
                expect(error.response.data).to.be.contains("address");
                expect(error.response.data).to.be.contains("amount");
                expect(error.response.data).to.be.contains("date");
                expect(error.response.data).to.be.contains("hospital");
            }
        });

        it('POST a name invalid bill, response 500', async() => {
            try {
                const invalidInfo = {
                            "patientName": "",
                            "patientAddress": "233 Lee St, NY",
                            "hospitalName": "Health Hospital",
                            "dateOfService": "2024-02-01",
                            "billAmount": 22.33
                        };
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("name");
            }
        });

        it('POST an address invalid bill, response 500', async() => {
            try {
                const invalidInfo = {
                            "patientName": "Ivy",
                            "patientAddress": "233 Lee St, NY",
                            "hospitalName": "Health Hospital",
                            "dateOfService": "2024-02-01",
                            "billAmount": 22.33
                        };
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("patientAddress");
            }
        });

        it('POST a hospital invalid bill, response 500', async() => {
            try {
                const invalidInfo = {
                            "patientName": "Ivy",
                            "patientAddress": "233 Lee St, NY",
                            "hospitalName": "",
                            "dateOfService": "2024-02-01",
                            "billAmount": 22.33
                        };
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("hospital");
            }
        });

        it('POST an amount invalid bill, response 500', async() => {
            try {
                const invalidInfo = {
                        "patientName": "Ivy",
                        "patientAddress": "233 Lee St, NY",
                        "hospitalName": "Hospital",
                        "dateOfService": "2024-02-01",
                        "billAmount": -1
                    };
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("amount");
            }
        });

        it('POST a date invalid bill, response 500', async() => {
            try {
                const invalidInfo = {
                        "patientName": "Ivy",
                        "patientAddress": "233 Lee St, NY",
                        "hospitalName": "Hospital",
                        "dateOfService": "2024-02-30",
                        "billAmount": 22.33
                    };
                const response = await axios.post(API_URL + "/bill", invalidInfo);
            } catch (error) {
                expect(error.response.status).to.be.equal(500);
                expect(error.response.data).to.be.contains("Insert bill failed");
                expect(error.response.data).to.be.contains("date");
            }
        });

        
    });
    
})