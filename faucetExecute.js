const {
    ethers
} = require('ethers')

const {networks, NetworkConst} = require('./networks')

const getProvider = networkObj => {
    if(networkObj.providers.providerName === 'alchemy'){
        return new ethers.providers.AlchemyProvider()
    }
}


const sendToken = async (network,  token, receiver, value) => {
    if(NetworkConst.isListed(network)){
        try {
            //const ehtersProvider = new ethers.getDefaultProvider('goerli')
            const provider = NetworkConst.getProvider(network)
            const wallet = NetworkConst.getWallet(network)
            const tokenInfo = NetworkConst.getToken(network, token)
            let tx;
            if(tokenInfo.nativeToken){
                tx = await wallet.connect(provider).sendTransaction({
                    to: receiver,
                    value: ethers.utils.parseEther(value)
                })
            } else {
                tx = await wallet.connect(provider).transfer()
            }

            const receipt = await tx.wait();

            // Check if the transaction was successfully completed
            if (receipt.status === 1) {
                console.log("Sucessfull transaction! https://mumbai.polygonscan.com/tx/" + tx.hash);
                return true
            } else {
                alert("Transaction failed! Please try again");
                return false
            }

        } catch (error) {
            console.log(error)
            return false
        }
    } else {
        console.log('not listed')
    }


}

sendToken('goerli','0x658410993417A2dE0aD73706EBB34885D7F6F007', '0.001')
