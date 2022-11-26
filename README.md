# Faucet Bot

A Discord bot to transfer tokens from Blockchains to server's users, using javascript and postgres. The user has a 24hrs wait time period to request the same token from the same network (that time can be modified using the constants.js file).

## How it works
The bot is divided in three parts: dbManager, to communicate with the database; networkManager, to manage the tokens and testnets, and a combination of scripts to manage discordjs

The dbManager has two helper functions to ensure that the timestamp stored in the database is always based in UTC time zone. Besides that, it has a function to check if the user can received that token and another to update the database.

The networkManager uses ethers to communicate with the blockchains. It has a number of helper functions to request information and a main functions that does all the work and transfer the token. The value to be transfer is set in the constants.js, but the function was built to accept any value making it easy to change the code so that each token has an specific value or the value is set by the user,

The rest of the code is responsible for managing the bot: commands folder, deploy-dommands.js and index.js.
 
The commands folder contains the code for the faucet bot. The bot uses pre-defined choices to ensure that there will be no wrong inputs. The available networks and tokens are configured in networks.js.

The deploy-commands.js will deploy the faucet command. That file only needs to be run once or when the faucet input information is changed like a new network was added or a new token. 

Finally, index.js runs the necessary code to respond the user's requests and keep the bot alive.
## How to use

After cloning the repository and running npm install, the user needs to add three files: constants.js, config.json and networks.js.

**Config.json**: This file contains the secret data that should not be pushed to a repository. Fill this information according to config.json.example and rename it to config.json.
0
**Constants.js**: This file contains the data that is necessary, but not secretive. 

**Networks.js**: Residing inside the network folder, it contains all the information about the testnets and its available tokens. If a new token or testnet is to be supported, all it takes is altering this file.

After everything is set, run:

	node deploy-commands.js
	npm start //to use node to run the bot in a testing enviromment 
	npm run production //to use pm2 to run the bot
 

## Prerequisites
The bot uses an SQL database to register the last time an user requested a specific token. This database needs to be previously configured, and its credentials and information added to constants.js and config.json. A database script is provided inside the database folder.

The bot also assumes that a function exists to convert the user's discordID to a wallet address. This function needs to replace discordIDToWallet.js
