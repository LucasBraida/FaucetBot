const {
    SlashCommandBuilder
} = require('discord.js');

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
    try {
        const tokenInfo = NetworkConst.getToken(networkValue, tokenValue)
        if(tokenInfo){
            interaction.reply(`you selected some ${tokenValue} from ${networkValue}`)
        }
    } catch (error) {
        interaction.reply('Something went wrong with you network/token pairing')
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
