import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Listing tokens with account:", owner.address);

    const VCC_ADDRESS = "0x53fa7BA2D2031EbD6Cc8E15FF927bE8D61ab5B85";
    const MARKET_ADDRESS = "0xeECdc827FB6BbA0EddE9f9d3c641870c0CA8e2Ab";

    const vcc = await ethers.getContractAt("VCC", VCC_ADDRESS);
    const marketplace = await ethers.getContractAt("Marketplace", MARKET_ADDRESS);

    // Approve the marketplace to handle our tokens
    console.log("Approving Marketplace...");
    const approveTx = await vcc.setApprovalForAll(MARKET_ADDRESS, true);
    await approveTx.wait();
    console.log("Marketplace approved.");

    // List Token ID 1 (Minted by Oracle)
    console.log("Listing Token ID 1 on the Marketplace...");
    const pricePerToken = ethers.parseEther("0.01"); // 0.01 tBNB
    const listTx = await marketplace.listVCC(1, 1, pricePerToken);
    await listTx.wait();

    console.log("✅ Token successfully listed! It is now available to be bought on the Frontend.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
