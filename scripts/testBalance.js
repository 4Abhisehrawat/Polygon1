const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider for Polygon Mumbai
  const mumbaiProviderUrl = "https://rpc-mumbai.maticvigil.com";

  // Create a provider for Polygon Mumbai
  const mumbaiProvider = new ethers.providers.JsonRpcProvider(mumbaiProviderUrl);

  // Create a signer from the private key and provider for Polygon Mumbai
  const mumbaiSigner = new ethers.Wallet(privateKey, mumbaiProvider);

  // The address of the deployed contract on Polygon Mumbai (update this with the actual contract address after deployment)
  const contractAddress = "0xYourContractAddressOnPolygonMumbai";

  // Get the contract factory and attach it to the signer for Polygon Mumbai
  const MyNFTCollection = await ethers.getContractFactory("MyNFTCollection", mumbaiSigner);
  const contract = await MyNFTCollection.attach(contractAddress);

  // The address of the Ethereum Goerli network token mapper (update this with the actual contract address)
  const tokenMapperAddress = "0xYourTokenMapperAddress";

  // Get the contract factory and attach it to the signer for Polygon Mumbai
  const TokenMapper = await ethers.getContractFactory("TokenMapper", mumbaiSigner);
  const tokenMapper = await TokenMapper.attach(tokenMapperAddress);

  // TokenIds to check the balance
  const tokenIds = [0, 1, 2, 3, 4];

  // Get the mapped tokenIds for the corresponding NFTs on Polygon Mumbai
  const mappedTokenIds = await Promise.all(tokenIds.map(async (tokenId) => {
    return await tokenMapper.getMappedTokenId(contract.address, tokenId);
  }));

  // Check the balance of the transferred NFTs on Polygon Mumbai
  for (let i = 0; i < mappedTokenIds.length; i++) {
    const balance = await contract.balanceOf(mumbaiSigner.address, mappedTokenIds[i]);
    console.log(`NFT with Token ID ${mappedTokenIds[i]} has a balance of ${balance.toString()} on Polygon Mumbai.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
