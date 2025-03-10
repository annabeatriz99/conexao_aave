require('@nomicfoundation/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sapolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
