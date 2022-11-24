const pool = require('./db')

const getInfo = async () => {
    try {
        const res = await pool.query('select * from userinfo where wallet = $1', ['0x6CB4e6Ff044321FFef16DE8Fd83d136cc3FCCD4b'])
        console.log(res.rows[0]['wallet'])
        // const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // const date2 = new Date().toISOString()
        // const dateBack = date.replace(' ','T') + '.000Z'
        // const date3 = Date.parse(dateBack)
        // const date4 = Date.now()
        // console.log(date)
        // console.log(date2)
        // console.log(date3)
        // console.log(date4)
        // console.log(date4 - date3 < 1000 ? true : false)
    } catch (error) {
        console.log(error)
    }
    
}

getInfo()