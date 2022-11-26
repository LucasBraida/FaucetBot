const { ethers } = require('ethers')
const { abi } = require('./IERC20.json')
const networks = require('./networks')


const networkManager = {
    isListed: (networkName) => {
        const network = networks.find(n => n.networkName === networkName.toLowerCase())
        if (network) {
            return true
        } else {
            return false
        }
    },
    getProviderWithJsonRpcUrl: function (networkName) {
        if (this.isListed(networkName)) {
            const { jsonRPCURL} = networks.find(n => n.networkName === networkName.toLowerCase())
            if(jsonRPCURL){
                return new ethers.providers.JsonRpcProvider(jsonRPCURL)
            } else {
                throw new Error('No Json RPC URL provided')
            }
        } else {
            throw new Error('Network not listed')
        }
    },
    getWallet: function (networkName) {
        const network = networks.find(n => n.networkName === networkName.toLowerCase())
        if (network) {
            return new ethers.Wallet(network.walletPrivateKey)
        } else {
            throw new Error('Network not listed')
        }
    },
    getAvailableTokens: function (networkName) {
        const network = networks.find(n => n.networkName === networkName.toLowerCase())
        if (network) {
            return network.aditionalTokens
        } else {
            throw new Error('Network not listed')
        }
    },
    getToken: function (networkName, tokenName) {
        const network = networks.find(n => n.networkName === networkName.toLowerCase())
        if (network) {
            const token = network.tokens.find(token => token.tokenName === tokenName.toLowerCase())
            if (token) {
                const tokenInfo = {
                    ...token,
                    tokenContract: token.nativeToken ? "" : new ethers.Contract(token.tokenAddress, abi)
                }
                return tokenInfo
            } else {
                throw new Error('Token not listed')
            }

        } else {
            throw new Error('Network not listed')
        }
    },
    sendToken: async function (network, token, receiver, value) {
        if(this.isListed(network)){

                const provider = this.getProviderWithJsonRpcUrl(network)
                const wallet = this.getWallet(network)
                const tokenInfo = this.getToken(network, token)
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
}

module.exports = networkManager