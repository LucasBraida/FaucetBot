const { GOERLI_INFO, MUMBAI_INFO, ALFAJORES_INFO } = require('../config.json')
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

module.exports = networks