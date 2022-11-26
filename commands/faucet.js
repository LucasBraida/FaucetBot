const {
    SlashCommandBuilder
} = require('discord.js');

const networkManager = require('../network/networkManager')
const networks = require('../network/networks')
const getWallet = require('../discordIDtoWallet');
const dbManager = require('../database/dbManager');
const { VALUE_TO_TRANSFER } = require('../constants')
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
        const tokenInfo = networkManager.getToken(networkValue, tokenValue)
        if (tokenInfo) {
            try {
                const userWallet = getWallet(interaction.user.id)
                const tkAvailable = await dbManager.checkTokenAvailabity(networkValue, tokenValue, userWallet)
                if (tkAvailable) {
                    const res = await networkManager.sendToken(networkValue, tokenValue, userWallet, VALUE_TO_TRANSFER)
                    if (res) {
                        await dbManager.updateTokenAvailability(networkValue, tokenValue, userWallet)
                        await interaction.editReply(`0.01${tokenValue.toUpperCase()} from ${networkValue.toUpperCase()} network sent to ${interaction.user.username}`)
                    }
                } else {
                    await interaction.editReply('You already requested this token in the last 24hrs. Please try again later')
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
};
