const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider
  const networkAddress = "https://ethereum-goerli.publicnode.com";

  // Create a provider using the URL
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a signer from the private key and provider
  const signer = new ethers.Wallet(privateKey, provider);

  // The address of the deployed contract (update this with the actual contract address after deployment)
  const contractAddress = "0x9d82a8709162B863CF5e62b51EE2B389505ACe87";

  // Get the contract factory and attach it to the signer
  const MyNFTCollection = await ethers.getContractFactory("MyNFTCollection", signer);
  const contract = await MyNFTCollection.attach(contractAddress);

  // Call the mintNFT function on the contract to mint 5 tokens
  await contract.mintNFT(5);

  // Log a message to the console to indicate that the tokens have been minted
  console.log("Minted 5 tokens");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
