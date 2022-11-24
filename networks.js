const { ethers } = require('ethers')
const { GOERLI_INFO, MUMBAI_INFO, ALFAJORES_INFO } = require('./config.json')
const { abi } = require('./IERC20.json')
const networks = [
    {
        networkName: 'goerli',
        walletPrivateKey: GOERLI_INFO.WALLET_PRIVATE_KEY,
        jsonRPCURL: GOERLI_INFO.JSON_RPC_URL,
        tokens: [
            {
                tokenName: 'eth',
                tokenAddress: '',
                nativeToken: true
            },
            {
                tokenName: 'link',
                tokenAddress: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
                nativeToken: false
            }
        ]
    },
    {
        networkName: 'mumbai',
        walletPrivateKey: MUMBAI_INFO.WALLET_PRIVATE_KEY,
        jsonRPCURL: MUMBAI_INFO.JSON_RPC_URL,
        tokens: [
            {
                tokenName: 'matic',
                tokenAddress: '',
                nativeToken: true
            },
            {
                tokenName: 'link',
                tokenAddress: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
                nativeToken: false
            }
        ]
    },
    {
        networkName: 'alfajores',
        walletPrivateKey: ALFAJORES_INFO.WALLET_PRIVATE_KEY,
        jsonRPCURL: ALFAJORES_INFO.JSON_RPC_URL,
        tokens: [
            {
                tokenName: 'celo',
                tokenAddress: '',
                nativeToken: true
            }
        ]
    },

]

const NetworkConst = {
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
    }
}

module.exports = { networks, NetworkConst }
