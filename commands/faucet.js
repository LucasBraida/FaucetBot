const {
    SlashCommandBuilder
} = require('discord.js');

const {
    ethers
} = require('ethers')

const {NetworkConst, networks} = require('../networks')

const networkChoices = networks.map(net => {
    return {
        name: net.networkName,
        value: net.networkName
    }
})
const tokenAvailable = networks.flatMap(net => {
    const tokens = net.tokens.map(token => {
        return token.tokenName
    })
    return tokens
})
const tokenChoices = [...new Set(tokenAvailable)].map(tk => {
    return {
        name: tk,
        value: tk
    }
})

const sendToken = async (network, token, receiver, value, providerName) => {
    if(NetworkConst.isListed(network)){

            //const provider = NetworkConst.getProvider(network, providerName)
            const provider = NetworkConst.getProviderWithJsonRpcUrl(network)
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
const data = new SlashCommandBuilder()
    .setName('faucet')
    .setDescription('Sends tokens to the user')
    .addStringOption(option =>
        option.setName('network')
        .setDescription('Network to be used')
        .setRequired(true)
        .addChoices(...networkChoices))
    .addStringOption(option =>
        option.setName('token')
        .setDescription('Token to be used')
        .setRequired(true)
        .addChoices(...tokenChoices))

const execute = async interaction => {
    const networkValue = interaction.options.getString('network')
    const tokenValue = interaction.options.getString('token')
    await interaction.deferReply()
    try {
        const tokenInfo = NetworkConst.getToken(networkValue, tokenValue)
        if(tokenInfo){
            try {
                const res = await sendToken(networkValue, tokenValue, '0xF3f5F2577cc3d735788922A006Fa10C49115Ddf6','0.01')
                console.log(res)
                if(res){
                    await interaction.editReply('sent')
                }
            } catch (error) {
                await interaction.editReply(error.message)
            }
        }
    } catch (error) {
        await interaction.editReply('Something went wrong with you network/token pairing')
    }

}

module.exports = {
    data,
    execute
    // async execute(interaction) {
    //     const gifValue = interaction.options.getString('network')
    //     await interaction.reply(gifValue);
    // },
};
