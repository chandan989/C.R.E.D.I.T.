// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title FarmRegistry
 * @dev On-chain registry for farmer data in the C.R.E.D.I.T. protocol.
 * Farmers register their land, methodology, commodity, and expected yields.
 * The Oracle later anchors their IoT sensor data to BNB Greenfield and
 * links the Greenfield URI back here.
 */
contract FarmRegistry {
    struct Farm {
        string farmerId;
        string farmerName;
        string location;
        string totalArea;
        string methodology;
        string commodity;
        string expectedYield;
        string greenfieldURI;   // Set by Oracle after data is anchored
        address walletAddress;
        uint256 registeredAt;
        bool exists;
    }

    Farm[] public farms;
    mapping(address => uint256[]) public farmerFarms; // wallet -> farm indices

    event FarmRegistered(
        uint256 indexed farmIndex,
        address indexed farmer,
        string farmerId,
        string commodity,
        string location
    );

    event GreenfieldURISet(
        uint256 indexed farmIndex,
        string greenfieldURI
    );

    /**
     * @dev Register a new farm on-chain.
     */
    function registerFarm(
        string memory _farmerId,
        string memory _farmerName,
        string memory _location,
        string memory _totalArea,
        string memory _methodology,
        string memory _commodity,
        string memory _expectedYield
    ) external returns (uint256) {
        uint256 index = farms.length;
        farms.push(Farm({
            farmerId: _farmerId,
            farmerName: _farmerName,
            location: _location,
            totalArea: _totalArea,
            methodology: _methodology,
            commodity: _commodity,
            expectedYield: _expectedYield,
            greenfieldURI: "",
            walletAddress: msg.sender,
            registeredAt: block.timestamp,
            exists: true
        }));
        farmerFarms[msg.sender].push(index);
        
        emit FarmRegistered(index, msg.sender, _farmerId, _commodity, _location);
        return index;
    }

    /**
     * @dev Set the Greenfield URI for a farm (called after Oracle anchors data).
     * Anyone can set it for MVP; in production, restrict to Oracle address.
     */
    function setGreenfieldURI(uint256 _farmIndex, string memory _uri) external {
        require(_farmIndex < farms.length, "Farm does not exist");
        farms[_farmIndex].greenfieldURI = _uri;
        emit GreenfieldURISet(_farmIndex, _uri);
    }

    /**
     * @dev Get total number of registered farms.
     */
    function getFarmCount() external view returns (uint256) {
        return farms.length;
    }

    /**
     * @dev Get full farm data by index.
     */
    function getFarm(uint256 _index) external view returns (
        string memory farmerId,
        string memory farmerName,
        string memory location,
        string memory totalArea,
        string memory methodology,
        string memory commodity,
        string memory expectedYield,
        string memory greenfieldURI,
        address walletAddress,
        uint256 registeredAt
    ) {
        require(_index < farms.length, "Farm does not exist");
        Farm storage f = farms[_index];
        return (
            f.farmerId, f.farmerName, f.location, f.totalArea,
            f.methodology, f.commodity, f.expectedYield,
            f.greenfieldURI, f.walletAddress, f.registeredAt
        );
    }

    /**
     * @dev Get all farm indices for a specific farmer wallet.
     */
    function getFarmerFarmIndices(address _farmer) external view returns (uint256[] memory) {
        return farmerFarms[_farmer];
    }
}
