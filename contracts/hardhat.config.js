require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

console.log("Infura Project ID:", process.env.INFURA_PROJECT_ID);
console.log("Private Key Length:", process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.length : "Not Loaded");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
