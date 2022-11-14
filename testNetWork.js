const {NetworkConst} = require('./networks')
const { ethers } = require('ethers')
const {abi} = require('./IERC20.json')
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

console.log('//////////////////////////////////')
try {
    const wallet = NetworkConst.getWallet('goerli')
    const provider = NetworkConst.getProvider('goerli')
    console.log(wallet)
    const walletSigner = wallet.connect(provider)
    //const token = new ethers.Contract('0x326C977E6efc84E512bB9C30f76E30c160eD06FB', abi)
    const token = NetworkConst.getToken('goerli','link').tokenContract
    console.log(token)
    const senToken = async () => {
        const tx = await token.connect(walletSigner).transfer('0xF3f5F2577cc3d735788922A006Fa10C49115Ddf6', ethers.utils.parseEther("1"))
        const receipt = await tx.wait();

            // Check if the transaction was successfully completed
            if (receipt.status === 1) {
                console.log("Sucessfull transaction! https://mumbai.polygonscan.com/tx/" + tx.hash);
            } else {
                alert("Transaction failed! Please try again");
            }
    }

    senToken()

} catch (error) {
    console.log(error)
}

