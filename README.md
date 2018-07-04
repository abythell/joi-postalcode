# joi-postalcode

[Joi](https://www.npmjs.com/package/joi) extension for validating postal codes
worldwide using [postal-codes-js](https://www.npmjs.com/package/postal-codes-js).

## How to Use

Get the required packages:
```
npm install joi joi-postalcode
```

Create an extended instance of Joi, then specify the 2-letter
ISO country code as a parameter to `postalCode` in your schema:

```
const Joi = require('joi')
const joiPostalCode = Joi.extend(require('joi-postalcode'))
joiPostalCode.string().postalCode('CA').validate('A1A 1A1') // Canada
joiPostalCode.string().postalCode('').validate('90210') // Default country is US
joiPostalCode.string().postalCode('tr').validate('33150') // Turkey
```

See [List of postal codes](https://en.wikipedia.org/wiki/List_of_postal_codes) for
a list of postal code formats and supported countries.
