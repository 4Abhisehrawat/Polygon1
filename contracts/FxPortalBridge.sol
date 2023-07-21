// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FxPortalBridge is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;

    // Mapping to keep track of the deposited tokens on Ethereum
    mapping(address => mapping(uint256 => bool)) private depositedTokens;

    // Event emitted when an asset is deposited on Ethereum
    event Deposit(address indexed sender, address indexed tokenAddress, uint256 indexed tokenId);

    // Event emitted when an asset is withdrawn from Ethereum
    event Withdraw(address indexed sender, address indexed tokenAddress, uint256 indexed tokenId);

    // Function to deposit an asset from Ethereum to Polygon
    function deposit(address tokenAddress, uint256 tokenId) external {
        require(!depositedTokens[tokenAddress][tokenId], "Token already deposited");
        // Your logic to handle the cross-chain transfer and minting on Polygon
        // You can mint the corresponding tokens on Polygon and keep track of the mapping between tokenId and corresponding tokenId on Polygon
        // Emit Deposit event after successful deposit
        tokenIdCounter.increment();
        depositedTokens[tokenAddress][tokenId] = true;
        emit Deposit(msg.sender, tokenAddress, tokenId);
    }

    // Function to withdraw an asset from Polygon to Ethereum
    function withdraw(address tokenAddress, uint256 tokenId) external onlyOwner {
        require(depositedTokens[tokenAddress][tokenId], "Token not deposited");
        // Your logic to handle the cross-chain transfer and burning on Polygon
        // You can burn the corresponding tokens on Polygon and keep track of the mapping between tokenId and corresponding tokenId on Polygon
        // Emit Withdraw event after successful withdrawal
        depositedTokens[tokenAddress][tokenId] = false;
        emit Withdraw(msg.sender, tokenAddress, tokenId);
    }

    // Function to check if an asset is already deposited
    function isDeposited(address tokenAddress, uint256 tokenId) external view returns (bool) {
        return depositedTokens[tokenAddress][tokenId];
    }
}
