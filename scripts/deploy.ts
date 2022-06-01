import { ethers } from "hardhat";

const deploy = async () => {
  const Notebook = await ethers.getContractFactory("Notebook");
  const notebook = await Notebook.deploy("Notebook", "NBK");
  console.log("Contract deployed to address:", notebook.address);
  const result = await notebook.deployTransaction.wait();
  console.log("gasUsed:", result.gasUsed);
  const Proxy = await ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(notebook.address);
  console.log("Contract deployed to address:", proxy.address);
  const r = await proxy.deployTransaction.wait();
};
deploy()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
