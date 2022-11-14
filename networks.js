const { ethers } = require('ethers')
const networks = [
    {
        networkName: 'goerli',
        walletPrivateKey: '',
        providers: [
            {
                providerName: 'alchemy',
                apiKey: '',
                available: true
            },
            {
                providerName: 'infura',
                apiKey: ''
            }
        ],
        tokens: [
            {
                tokenName: 'eth',
                tokenAddress: '',
                nativeToken: true
            },
            {
                tokenName: 'link',
                tokenAddress: '',
                nativeToken: false
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
    getProvider: function (networkName) {
        if (this.isListed(networkName)) {
            const { providers } = networks.find(n => n.networkName === networkName.toLowerCase())
            if (providers.length > 0) {
                const providerInfo = providers.find(p => p.available === true)
                if (providerInfo) {
                    switch (providerInfo.providerName) {
                        case 'alchemy':
                            return new ethers.providers.AlchemyProvider(networkName, providerInfo.apiKey)
                        case 'infura':
                            return new ethers.providers.AlchemyProvider(networkName, providerInfo.apiKey)
                    }

                } else {
                    throw new Error('No registered providers are not available')
                }
            } else {
                throw new Error('No providers registered')
            }
        } else {
            throw new Error('Network not listed')
        }
    },
    getWallet: function (networkName) {
        const network = networks.find(n => n.networkName === networkName.toLowerCase())
        if (network) {
            return network.aditionalTokens
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
            if(token){
                return token
            } else {
                throw new Error('Token not listed')
            }

        } else {
            throw new Error('Network not listed')
        }
    }
}

module.exports = { networks, NetworkConst }
