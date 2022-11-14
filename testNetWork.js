const {NetworkConst} = require('./networks')

console.log(NetworkConst.isListed('goerli'))
console.log(NetworkConst.isListed('GoErli'))

try {
    const p = NetworkConst.getProvider('goerli')
    console.log(p)
} catch (error) {
    console.log(error)
}

console.log('//////////////////////////////')


// try {
//     const p = NetworkConst.getProvider('gweli')
//     console.log(p)
// } catch (error) {
//     console.log(error)
// }

try {
    const a = NetworkConst.getAvailableTokens('goerli')
    console.log(a)
} catch (error) {
    console.log(error)
}
console.log('//////////////////////////////')
try {
    const a = NetworkConst.getToken('goerli', 'eth')
    console.log(a)
} catch (error) {
    console.log(error)
}

console.log('//////////////////////////////')
try {
    const a = NetworkConst.getToken('goerli', 'link')
    console.log(a)
} catch (error) {
    console.log(error)
}


console.log('//////////////////////////////')
try {
    const a = NetworkConst.getToken('goerli', 'matic')
    console.log(a)
} catch (error) {
    console.log(error)
}




