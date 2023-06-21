const hre = require("hardhat");

async function main() {
  const upload = await hre.ethers.deployContract("Tracking");

  await upload.waitForDeployment();

  console.log(`Contract deployed at ${await upload.getAddress()}`);
  // 0x5fbdb2315678afecb367f032d93f642f64180aa3;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
