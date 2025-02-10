require('@nomicfoundation/hardhat-ethers');
require('dotenv').config();

module.exports = {
    solidity: {
        version: "0.8.28",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
};
