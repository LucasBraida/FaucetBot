const { Pool, types } = require('pg')
const getWallet = require('./discordIDtoWallet')
const TIME_TO_WAIT = require('./constants')
const {dbPasswd} = require('../config.json')
//Connect to the database
const pool = new Pool({
    user: 'postgres',
    password: dbPasswd,
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
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

const checkTokenAvailabity = async (network, token, userDiscordID) => {
    const userWallet = getWallet(userDiscordID)
    const currentDate = Date.now()
    const userDBInfo = await pool.query(`select * from userinfo where wallet = $1`, [userWallet])
    const tokenTimeSQL = userDBInfo.rows[0][`ft${token}${network}`]
    console.log(tokenTimeSQL)
    if (tokenTimeSQL) {
        const tokenTime = convertSQLTimeToTimestamp(tokenTimeSQL)
        console.log(tokenTime)
        console.log(currentDate)
        console.log(tokenTime + TIME_TO_WAIT)
        return currentDate - (tokenTime + TIME_TO_WAIT) > 0
    } else {
        return true
    }
}

const updateTokenAvailability = async (network, token, userDiscordID) => {
    const userWallet = getWallet(userDiscordID)
    const currentDate = getTimestampToSQLTime()
    await pool.query(`update userinfo set ft${token}${network} = $1 where wallet = $2`, [currentDate, userWallet])
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const testFunction = async () => {
    let res = await checkTokenAvailabity('goerli', 'link', 'blabla')
    console.log(res)
    updateTokenAvailability('goerli', 'link', 'blabla')
    await sleep(3000)
    res = await checkTokenAvailabity('goerli', 'link', 'blabla')
    console.log(res)
}

testFunction()