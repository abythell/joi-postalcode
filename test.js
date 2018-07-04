/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect
const Joi = require('joi')
const postalJoi = Joi.extend(require('./index.js'))

describe('postalJoi', () => {
  it('defaults to ISO country code US', () => {
    let result = postalJoi.string().postalCode().validate('90210')
    expect(result.error).to.equal(null)
    expect(result.value).to.equal('90210')
  })
  it('accepts valid postal codes', () => {
    let result = postalJoi.string().postalCode('CA').validate('A1A 1A1')
    expect(result.error).to.equal(null)
    expect(result.value).to.equal('A1A 1A1')
  })
  it('rejects invalid postal codes', () => {
    let result = postalJoi.string().postalCode('CA').validate('A1A 111')
    expect(result.error).to.be.instanceof(Error)
    expect(result.error.message).to.be.a('string')
  })
  it('validates all examples given in the postal-codes-js README', () => {
    expect(postalJoi.string().postalCode('bg').validate('1003').error).to.equal(null)
    expect(postalJoi.string().postalCode('gb').validate('EC1A 1BB').error).to.equal(null)
    expect(postalJoi.string().postalCode('gb').validate('EC1A1BB').error).to.equal(null)
    expect(postalJoi.string().postalCode('gb').validate('EC1A-1BB').error).to.equal(null)
    expect(postalJoi.string().postalCode('tr').validate('33150').error).to.equal(null)
    expect(postalJoi.string().postalCode('us').validate('22313').error).to.equal(null)
  })
})