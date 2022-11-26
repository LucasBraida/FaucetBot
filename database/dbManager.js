const { Pool, types } = require('pg')
const {TIME_TO_WAIT, DB_USER, DB_PORT,DB_HOST, DB_DATABASE, DB_TABLE} = require('../constants')
const { dbPasswd } = require('../config.json')
//Connect to the database
const pool = new Pool({
    user: DB_USER,
    password: dbPasswd,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE
})

//Alter pg behavior to ensure timestamp is always in UTC and not converted to the server timezone
types.setTypeParser(1114, function (stringValue) {
    return stringValue;
})


const convertSQLTimeToTimestamp = (sqlTime) => {
    const timeString = sqlTime.replace(' ', 'T') + '.000Z'
    return Date.parse(timeString)
}

const getTimestampToSQLTime = () => {
    const sqlTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return sqlTime
}

const dbManager = {
    checkTokenAvailabity: async function (network, token, userWallet){
        const currentDate = Date.now()
        const { rows } = await pool.query(`select * from ${DB_TABLE} where wallet = $1`, [userWallet])
        //If rows is empty, then there isn't an entry for this wallet. 
        //That means it's the first time the user is requesting and, therefore, it's not limited by the waiting period.
        if (rows.length > 0) {
            const tokenTimeSQL = rows[0][`ft${token}${network}`]
            if (tokenTimeSQL) {
                const tokenTime = convertSQLTimeToTimestamp(tokenTimeSQL)
                return currentDate - (tokenTime + TIME_TO_WAIT) > 0
            } else {
                return true
            }
        } else {
            return true
        }
    
    },
    updateTokenAvailability:  async function (network, token, userWallet) {
        const currentDate = getTimestampToSQLTime()
        const {rowCount} = await pool.query(`update ${DB_TABLE} set ft${token}${network} = $1 where wallet = $2`, [currentDate, userWallet])
        //If the query did not find anything to update, is the user's first request and it needs to be inserted
        if(rowCount==0){
            await pool.query(`insert into ${DB_TABLE} (wallet,ft${token}${network}) values($1,$2)`,[userWallet, currentDate])
        }
    }
}

module.exports = dbManager