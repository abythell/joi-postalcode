const postalCodes = require('postal-codes-js')

/**
 * Joi extension for validating postal codes.
 * @see https://www.npmjs.com/package/postal-codes-js
 * @see https://en.wikipedia.org/wiki/List_of_postal_codes
 * @example
 * const joiPostalCode = Joi.extend(require('joi-postalcode'))
 * joiPostalCode.string().postalCode('CA').validate('A1A 1A1')
 * joiPostalCode.string().postalCode('bg').validate('1003')
 * joiPostalCode.string().postalCode('us').validate('22313')
 */
module.exports = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    postalCode: '{{v}} is not a valid {{cc}} postal code'
  },
  rules: [{
    name: 'postalCode',
    params: {
      cc: joi.string().length(2).error(() => {
        return {
          message: 'parameter should be a 2-letter ISO 3166-1 country code'
        }
      })
    },
    validate (params, value, state, options) {
      if (!params.cc) params.cc = 'us'
      if (postalCodes.validate(params.cc, value) !== true) {
        // returned value is an error string
        return this.createError('string.postalCode', { v: value, cc: params.cc }, state, options)
      } else {
        return value
      }
    }
  }]
})
