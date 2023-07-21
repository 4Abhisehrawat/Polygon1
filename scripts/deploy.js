const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  // Get the contract factory
  const NFTCollection = await ethers.getContractFactory("MyNFTCollection");

  // Deploy the contract
  const nft = await NFTCollection.deploy();

  // Wait for the contract to be deployed
  await nft.deployed();

  // Log the contract address
  console.log("NFT contract deployed to:", nft.address);
  // Deploy FxPortalBridge contract
  const FxPortalBridge = await ethers.getContractFactory("FxPortalBridge");
  const fxPortalBridge = await FxPortalBridge.deploy();
  await fxPortalBridge.deployed();
  console.log("FxPortalBridge contract deployed to:", fxPortalBridge.address);

  // Export the contract address
  fs.writeFileSync('metadata/contractAddress.js', `
    export const nftAddress = "${nft.address}"
  `);
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
