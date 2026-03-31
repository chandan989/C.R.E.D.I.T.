import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy VCC (ERC1155)
  // We set the deployer as both the owner and the initial authorized oracle
  const VCC = await ethers.getContractFactory("VCC");
  const vcc = await VCC.deploy(deployer.address, deployer.address);
  await vcc.waitForDeployment();
  const vccAddress = await vcc.getAddress();
  console.log("VCC Contract deployed to:", vccAddress);

  // Deploy ACFC (ERC721)
  const ACFC = await ethers.getContractFactory("ACFC");
  const acfc = await ACFC.deploy(deployer.address, deployer.address);
  await acfc.waitForDeployment();
  const acfcAddress = await acfc.getAddress();
  console.log("ACFC Contract deployed to:", acfcAddress);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(vccAddress, acfcAddress, deployer.address);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("Marketplace Contract deployed to:", marketplaceAddress);

  console.log("\nDeployment successful! 🚀");
  console.log("\nSave these addresses for your Oracle backend and React frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
