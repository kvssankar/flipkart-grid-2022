require("@nomiclabs/hardhat-waffle");

const fs = require("fs");

// The private key is the private key of the metamask account
const private_key = "1d8ecc00da9a5cb613faf729cb7db2f4d9919e53d4a447e59268a938daf293ed"

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
