const errorList = require('./localeValidationError');
const idioma = 'es';

class ValidateExceptions {
    constructor(error) {
        this.validationErrorItems = error.errors;
    }

    get message() {
        let errors = {};
        for (let item = 0; item < this.validationErrorItems.length; item++) {
            let validationErrorItem = this.validationErrorItems[item];
            if (errorList.hasOwnProperty(validationErrorItem.validatorKey)) {
                errors[validationErrorItem.path] = errorList[
                    validationErrorItem.validatorKey
                ].hasOwnProperty(idioma)
                    ? errorList[validationErrorItem.validatorKey][idioma]
                    : validationErrorItem.message;
            } else {
                errors[validationErrorItem.path] = validationErrorItem.message;
            }
        }
        return errors;
    }
}

module.exports = ValidateExceptions;
