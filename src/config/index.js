const _ = require('lodash')
const {Config, source, env} = require('@monsantoit/config')
// @monsantoit/config module docs here: https://config.phoenix-tools-np.io/

const determineEnvironmentFileName = () => {
    if (!_.isEmpty(process.env.DEPLOYABLE_ENV)) {
        return process.env.DEPLOYABLE_ENV
    } else {
        return process.env.NODE_ENV || 'default'
    }
}

const config = new Config({
    sources: [
        source.fromJS({src: `${__dirname}/files/${determineEnvironmentFileName()}.js`}),
        source.fromCloudFoundry()
    ],
    processors: [
    ],
    required: []
})

module.exports = config