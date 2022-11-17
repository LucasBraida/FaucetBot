const {
    ethers
} = require('ethers')

const {networks, NetworkConst} = require('./networks')

const getProvider = networkObj => {
    if(networkObj.providers.providerName === 'alchemy'){
        return new ethers.providers.AlchemyProvider()
    }
}


const sendToken = async (network, token, receiver, value, providerName) => {
    if(NetworkConst.isListed(network)){

            const provider = NetworkConst.getProvider(network, providerName)
            const wallet = NetworkConst.getWallet(network)
            const tokenInfo = NetworkConst.getToken(network, token)
            let tx;
            if(tokenInfo.nativeToken){
                tx = await wallet.connect(provider).sendTransaction({
                    to: receiver,
                    value: ethers.utils.parseEther(value)
                })
            } else {
                const walletSigner = wallet.connect(provider)
                tx = await tokenInfo.tokenContract.connect(walletSigner).transfer(receiver, ethers.utils.parseEther(value))
            }

            const receipt = await tx.wait();

            // Check if the transaction was successfully completed
            if (receipt.status === 1) {
                return true
            } else {
                throw new Error("Transaction failed! Please try again");
            }

    } else {
        throw new Error('Network not listed')
    }


}

sendToken('maticmum', 'matic','0xF3f5F2577cc3d735788922A006Fa10C49115Ddf6', '0.01', 'alchemy')
