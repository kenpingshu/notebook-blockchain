import "@nomiclabs/hardhat-web3";
import { ethers, web3, expect } from "hardhat";
import { Proxy } from "../typechain";

// let notebook: Notebook;
let proxy: Proxy;

beforeEach(async () => {
  const Notebook = await ethers.getContractFactory("Notebook");
  const notebook = await Notebook.deploy("Notebook", "NBK");
  await notebook.deployed();
  const Proxy = await ethers.getContractFactory("Proxy");
  proxy = await Proxy.deploy(notebook.address);
  await proxy.deployed();
});

describe("Proxy", function () {
  describe("draw", async () => {
    it("should success", async function () {
      const [owner, client, client2] = await ethers.getSigners();
      // console.log(await client.getBalance());
      const content = "this is content";
      const tx = await proxy.connect(owner).createNote(client.address, content);
      await tx.wait();
      // console.log(await client.getBalance());
      const mintedTx = await proxy.connect(owner).mint(client.address, tx.hash);
      await mintedTx.wait();
      // console.log(await client.getBalance());
      const donateTx = await proxy
        .connect(client2)
        .donate(tx.hash, { value: ethers.utils.parseEther("20") });
      await donateTx.wait();
      const drawTx = await proxy.connect(client).draw();
      await drawTx.wait();
      // const balance = await ethers.provider.getBalance(notebook.address);
      // console.log(balance);
    });
  });
  describe("donate", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await proxy.connect(owner).createNote(client.address, content);
      await tx.wait();
      const mintedTx = await proxy.connect(owner).mint(client.address, tx.hash);
      await mintedTx.wait();
      await proxy
        .connect(client)
        .donate(tx.hash, { value: ethers.utils.parseEther("1") });
      const balance = await ethers.provider.getBalance(proxy.address);
      expect(balance.toString()).to.equal(ethers.utils.parseEther("1"));
    });
  });
  describe("mint", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await proxy.connect(owner).createNote(client.address, content);
      await tx.wait();
      const mintTx = await proxy.connect(owner).mint(client.address, tx.hash);
      await mintTx.wait();
      const ownerAddress = await proxy.ownerOf(tx.hash);
      expect(ownerAddress).to.equal(client.address);
    });
    it("should revert by ownership", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await proxy.connect(owner).createNote(client.address, content);
      const mintTx = proxy.connect(client).mint(client.address, tx.hash);
      await expect(mintTx).to.be.revertedWith("mint fail");
    });
  });
  describe("create", function () {
    it("should success", async function () {
      // Do something with the accounts
      const [owner, creator] = await ethers.getSigners();
      const content =
        "*this is  * contentthis is contentthis is contentthis " +
        "is contentthis is contentthis is contentthis is contentthis " +
        "is contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is" +
        " contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is " +
        "contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is content*this is  * contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is content";
      const tx = await proxy
        .connect(owner)
        .createNote(creator.address, content);
      const getTx = await ethers.provider.getTransaction(tx.hash);
      const inputData = "0x" + getTx.data.slice(10);
      const params = web3.eth.abi.decodeParameters(
        ["address", "string"],
        inputData
      );
      expect(params["1"]).to.equal(content);
    });
    it("should reverted by ownership", async function () {
      // Do something with the accounts
      const [, creator] = await ethers.getSigners();
      const content = "*this is  * contentthis is contentthis is contentthis ";
      const tx = proxy.connect(creator).createNote(creator.address, content);
      await expect(tx).to.be.revertedWith("create note fail");
    });
  });
});
