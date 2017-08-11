const supports = require('./new.json')
const _ = require('lodash')

const styleField = 'background'
const x = _.compact(
  _.map(supports[styleField], (value, key) => {
    if (_.isString(value)) {
      return [key, value]
    }
    return null
  })
)
// const [platform, text]

console.log(x)
