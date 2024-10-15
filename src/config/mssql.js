// Desc: Configuration for mssql connection

export default {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    port : parseInt(process.env.PORT),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    connectionTimeout: 30000,
    requestTimeout: 60000,
};