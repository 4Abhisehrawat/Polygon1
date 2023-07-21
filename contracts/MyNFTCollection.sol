// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFTCollection is ERC721Enumerable, Ownable {
    struct NFTMetadata {
        string name;
        string description;
        string image;
    }

    NFTMetadata[] public nfts;
    uint256 public maxQuantity = 5;
    uint256 public currentTokenId = 0;

    constructor() ERC721("MyNFTCollection", "MNC") {
        nfts.push(NFTMetadata('Mini Spidy', 'Mini Spidy NFT', 'QmNnGkBZUGpd813oj2HdXKTGZ14Kq6GthzpBWS56QZu14F'));
        nfts.push(NFTMetadata('Mini Superman', 'Mini Superman NFT', 'QmUGzZjKHJmPW2c59SzKD67fkAR2woF8ssbexapBhRBgHb'));
        nfts.push(NFTMetadata('Mini Ironman', 'Mini Ironman NFT', 'QmXu6bhmnndv5zZEDR1gKZgF9C2EYYvaZcfgMcUvTM5Z92'));
        nfts.push(NFTMetadata('Mini Zoro', 'Mini Zoro NFT', 'QmPykhSm9ejzFr5MXyvf3GSwSSAetE277rCRumxvpHti2S'));
        nfts.push(NFTMetadata('Mini Luffy', 'Mini Luffy NFT', 'QmXVuBpfU3MbXRtir4j9k7H6ZLgNn32ZWXA2koJBLBE9Z6'));
    }

    // Override the baseURI function to return the base URL for the NFTs (IPFS gateway)
    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.ipfs.io/ipfs/";
    }

    // Returns the prompt used to generate the images for the given NFT tokenId
    function promptDescription(uint256 tokenId) external view returns (string memory) {
        require(tokenId < nfts.length, "TokenId does not exist");
        return nfts[tokenId].description;
    }

    // Function to mint NFTs (Only contract owner can call this function)
    function mintNFT(uint256 quantity) external onlyOwner {
        require(currentTokenId + quantity <= maxQuantity, "Exceeds maximum token limit");
        for (uint256 i = 0; i < quantity; i++) {
            _mint(msg.sender, currentTokenId);
            currentTokenId++;
        }
    }
}

contract FxPortalBridge {
    event Deposit(address indexed from, address indexed to, uint256 tokenId, string data);

    function deposit(string calldata data, address to, uint256 tokenId) external {

        emit Deposit(msg.sender, to, tokenId, data);
    }
}
