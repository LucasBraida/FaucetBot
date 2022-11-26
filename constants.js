const TIME_TO_WAIT = 86400000
//Value must be string to user ether's parse function
const VALUE_TO_TRANSFER = '0.01'
const DB_USER = 'postgres'
const DB_HOST = 'localhost'
const DB_PORT =5432
const DB_DATABASE = 'lw3faucet'
const DB_TABLE = 'userinfo'
module.exports = {
    TIME_TO_WAIT,
    VALUE_TO_TRANSFER,
    DB_USER,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_TABLE
}