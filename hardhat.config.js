require("@nomiclabs/hardhat-waffle");

const fs = require("fs");

// The private key is the private key of the metamask account
const private_key = fs.readFileSync(".secret").toString();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/majfjtVbZyEyzPxxi9T2sDFjA_Z_8sxq`,
      accounts: [private_key],
    },
    // mainnet: {
    //   url:
    // }
  },
  solidity: "0.8.4",
};
