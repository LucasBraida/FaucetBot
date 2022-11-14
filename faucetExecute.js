const {
    ethers
} = require('ethers')

const {networks, NetworkConst} = require('./networks')

const getProvider = networkObj => {
    if(networkObj.providers.providerName === 'alchemy'){
        return new ethers.providers.AlchemyProvider()
    }
}


const sendToken = async (network, token, receiver, value) => {
    if(NetworkConst.isListed(network)){
        try {
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
                const walletSigner = wallet.connect(provider)
                tx = await tokenInfo.tokenContract.connect(walletSigner).transfer(receiver, ethers.utils.parseEther(value))
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

sendToken('goerli', 'link','0xF3f5F2577cc3d735788922A006Fa10C49115Ddf6', '0.01')
