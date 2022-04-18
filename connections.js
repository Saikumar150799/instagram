const { Client } = require('pg')
const client = new Client(
    {
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "sai",
        database: "postgres",
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }
)
module.exports = client
