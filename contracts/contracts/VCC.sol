// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VCC is ERC1155, Ownable {
    uint256 public currentTokenId;
    mapping(uint256 => string) private _tokenURIs;
    address public oracleSigner;

    event VCCMinted(uint256 indexed tokenId, address indexed farmer, uint256 amount, string metadataURI);

    constructor(address initialOwner, address _oracleSigner) ERC1155("") Ownable(initialOwner) {
        oracleSigner = _oracleSigner;
    }

    function setOracleSigner(address _signer) external onlyOwner {
        oracleSigner = _signer;
    }

    function mint(address account, uint256 amount, string memory metadataURI) external returns (uint256) {
        require(msg.sender == oracleSigner || msg.sender == owner(), "Not authorized to mint");
        
        currentTokenId++;
        uint256 newItemId = currentTokenId;
        
        _tokenURIs[newItemId] = metadataURI;
        _mint(account, newItemId, amount, "");
        
        emit VCCMinted(newItemId, account, amount, metadataURI);
        return newItemId;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return _tokenURIs[id];
    }
}
