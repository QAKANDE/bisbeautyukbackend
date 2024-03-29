const { Client, Environment } = require('square')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Square client config
const config = {
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
}

// Configure instance of Square client
const defaultClient = new Client(config)

module.exports = defaultClient