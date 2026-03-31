// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ACFC is ERC721URIStorage, Ownable {
    uint256 public currentTokenId;
    address public oracleSigner;

    event ACFCMinted(uint256 indexed tokenId, address indexed farmer, string metadataURI);

    constructor(address initialOwner, address _oracleSigner) ERC721("CREDIT-ACFC", "ACFC") Ownable(initialOwner) {
        oracleSigner = _oracleSigner;
    }

    function setOracleSigner(address _signer) external onlyOwner {
        oracleSigner = _signer;
    }

    function mint(address account, string memory metadataURI) external returns (uint256) {
        require(msg.sender == oracleSigner || msg.sender == owner(), "Not authorized to mint");
        
        currentTokenId++;
        uint256 newItemId = currentTokenId;
        
        _mint(account, newItemId);
        _setTokenURI(newItemId, metadataURI);
        
        emit ACFCMinted(newItemId, account, metadataURI);
        return newItemId;
    }
}
