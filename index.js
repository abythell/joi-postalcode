const postalCodes = require('postal-codes-js')

module.exports = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    postalCode: '{{v}} is not a valid {{cc}} postal code'
  },
  rules: [{
    name: 'postalCode',
    params: {
      cc: joi.string().length(2)
    },
    validate (params, value, state, options) {
      if (!params.cc) params.cc = 'us'
      if (postalCodes.validate(params.cc, value) !== true) {
        // returned value is an error string
        return this.createError('string.postalCode', {v: value, cc: params.cc}, state, options)
      } else {
        return value
      }
    }
  }]
})
