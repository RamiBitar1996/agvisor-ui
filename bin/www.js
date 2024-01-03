#!/usr/bin/env node
require('dotenv').config()

const config = require('../src/config')

config
    .init()
    .then(() => {
        require('../server')
        
    })
    .catch((err) => {
        console.error('Error: ', err)
        process.exit()
    })
