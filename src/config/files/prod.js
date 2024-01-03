const _ = require('lodash')
const defaultConfig = require('./production')

module.exports = _.merge(defaultConfig, {
    'phoenix-home': {value: 'phoenix-tools.io', env: 'Prod'},
})