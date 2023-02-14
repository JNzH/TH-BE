const moment = require('moment')

module.exports = {
    validateBill: function(params) {
        let errors = [];
        if (!params.patientName) {
            errors.push('name required and cannot be empty')
        }
    
        if (!params.patientAddress) {
            errors.push('address required and cannot be empty')
        }

        if (!params.hospitalName) {
            errors.push('hospital required and cannot be empty')
        }
    
        if (!moment(params.dateOfService, "YYYY-MM-DD", true).isValid()) {
            errors.push('date of service required valid YYYY-MM-DD format');
        }
    
        if (!Number.isFinite(params.billAmount) || params.billAmount < 0) {
            errors.push('bill amount required and must be non-negative');
        }

        return errors;
    }
}

