// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Marketplace is Ownable, ERC1155Holder, ERC721Holder {
    IERC1155 public vccToken;
    IERC721 public acfcToken;
    address payable public treasury;
    uint256 public protocolFeePercentage = 25; // 2.5% fee encoded as 25 (basis points out of 1000)

    struct Listing1155 {
        uint256 amount;
        uint256 pricePerToken;
        address seller;
        bool active;
    }

    struct Listing721 {
        uint256 price;
        address seller;
        bool active;
    }

    mapping(uint256 => Listing1155) public vccListings;
    mapping(uint256 => Listing721) public acfcListings;

    event VCCListed(uint256 indexed tokenId, address seller, uint256 amount, uint256 pricePerToken);
    event VCCBought(uint256 indexed tokenId, address buyer, uint256 amount, uint256 totalPrice);
    event ACFCListed(uint256 indexed tokenId, address seller, uint256 price);
    event ACFCBought(uint256 indexed tokenId, address buyer, uint256 price);

    constructor(address _vccToken, address _acfcToken, address payable _treasury) Ownable(msg.sender) {
        vccToken = IERC1155(_vccToken);
        acfcToken = IERC721(_acfcToken);
        treasury = _treasury;
    }

    // --- VCC (ERC1155) Methods ---
    function listVCC(uint256 tokenId, uint256 amount, uint256 pricePerToken) external {
        require(vccToken.balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");
        require(vccToken.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved");

        vccListings[tokenId] = Listing1155(amount, pricePerToken, msg.sender, true);
        emit VCCListed(tokenId, msg.sender, amount, pricePerToken);
    }

    function buyVCC(uint256 tokenId, uint256 amountToBuy) external payable {
        Listing1155 storage listing = vccListings[tokenId];
        require(listing.active, "Not listed");
        require(listing.amount >= amountToBuy, "Not enough supply");
        require(msg.value == listing.pricePerToken * amountToBuy, "Incorrect value");

        listing.amount -= amountToBuy;
        if (listing.amount == 0) {
            listing.active = false;
        }

        uint256 fee = (msg.value * protocolFeePercentage) / 1000;
        uint256 sellerProceeds = msg.value - fee;

        treasury.transfer(fee);
        payable(listing.seller).transfer(sellerProceeds);

        vccToken.safeTransferFrom(listing.seller, msg.sender, tokenId, amountToBuy, "");
        emit VCCBought(tokenId, msg.sender, amountToBuy, msg.value);
    }

    // --- ACFC (ERC721) Methods ---
    function listACFC(uint256 tokenId, uint256 price) external {
        require(acfcToken.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(acfcToken.getApproved(tokenId) == address(this) || acfcToken.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved");

        acfcListings[tokenId] = Listing721(price, msg.sender, true);
        emit ACFCListed(tokenId, msg.sender, price);
    }

    function buyACFC(uint256 tokenId) external payable {
        Listing721 storage listing = acfcListings[tokenId];
        require(listing.active, "Not listed");
        require(msg.value == listing.price, "Incorrect value");

        listing.active = false;

        uint256 fee = (msg.value * protocolFeePercentage) / 1000;
        uint256 sellerProceeds = msg.value - fee;

        treasury.transfer(fee);
        payable(listing.seller).transfer(sellerProceeds);

        acfcToken.safeTransferFrom(listing.seller, msg.sender, tokenId);
        emit ACFCBought(tokenId, msg.sender, msg.value);
    }
}
