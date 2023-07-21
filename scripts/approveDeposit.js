const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider for Ethereum Goerli
  const goerliProviderUrl = "https://ethereum-goerli.publicnode.com";

  // Create a provider for Ethereum Goerli
  const goerliProvider = new ethers.providers.JsonRpcProvider(goerliProviderUrl);

  // Create a signer from the private key and provider for Ethereum Goerli
  const goerliSigner = new ethers.Wallet(privateKey, goerliProvider);

  // The address of the deployed contract on Ethereum Goerli (update this with the actual contract address after deployment)
  const contractAddress = "0x9d82a8709162B863CF5e62b51EE2B389505ACe87";

  // Get the contract factory and attach it to the signer for Ethereum Goerli
  const MyNFTCollection = await ethers.getContractFactory("MyNFTCollection", goerliSigner);
  const contract = await MyNFTCollection.attach(contractAddress);

  // The address of the FxPortal Bridge contract on Ethereum Goerli (update this with the actual contract address)
  const fxPortalBridgeAddress = "0x97FDBfAd6F9db2ce61661F1C36dC3449172929Fc";

  // Get the contract factory and attach it to the signer for Ethereum Goerli
  const FxPortalBridge = await ethers.getContractFactory("FxPortalBridge", goerliSigner);
  const bridgeContract = await FxPortalBridge.attach(fxPortalBridgeAddress);

  // TokenIds to transfer
  const tokenIds = [0, 1, 2, 3, 4];

  // Approve the NFTs for transfer to the FxPortal Bridge contract
  for (let i = 0; i < tokenIds.length; i++) {
    await contract.approve(fxPortalBridgeAddress, tokenIds[i]);
    console.log(`NFT with Token ID ${tokenIds[i]} approved for transfer.`);
  }

  // Deposit the NFTs to the FxPortal Bridge contract for the transfer
  const depositTx = await bridgeContract.deposit(contract.address, tokenIds);
  await depositTx.wait();

  console.log("NFTs deposited to the FxPortal Bridge for transfer.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
