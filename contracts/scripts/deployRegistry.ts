import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying FarmRegistry with:", deployer.address);

  const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
  const registry = await FarmRegistry.deploy();
  await registry.waitForDeployment();
  
  const address = await registry.getAddress();
  console.log("✅ FarmRegistry deployed to:", address);
  console.log("\n⚠️  Update this address in your frontend (FarmerPortal.tsx, CarbonMarket.tsx, ACFCMarket.tsx)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
