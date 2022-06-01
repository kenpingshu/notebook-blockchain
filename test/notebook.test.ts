import "@nomiclabs/hardhat-web3";
import { ethers, web3, expect } from "hardhat";
import { Notebook } from "../typechain";

let notebook: Notebook;

beforeEach(async () => {
  const Notebook = await ethers.getContractFactory("Notebook");
  notebook = await Notebook.deploy("Notebook", "NBK");
  await notebook.deployed();
});

describe("Notebook", function () {
  describe("draw", async () => {
    it("should success", async function () {
      const [owner, client, client2] = await ethers.getSigners();
      const content = "this is content";
      const tx = await notebook
        .connect(owner)
        .createNote(client.address, content);
      await tx.wait();
      const mintedTx = await notebook
        .connect(owner)
        .mint(client.address, tx.hash);
      await mintedTx.wait();
      const donateTx = await notebook
        .connect(client2)
        .donate(tx.hash, { value: ethers.utils.parseEther("20") });
      await donateTx.wait();
      const drawTx = await notebook.connect(client).draw();
      await drawTx.wait();
    });
  });
  describe("donate", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await notebook
        .connect(owner)
        .createNote(client.address, content);
      await tx.wait();
      const mintedTx = await notebook
        .connect(owner)
        .mint(client.address, tx.hash);
      await mintedTx.wait();
      await notebook
        .connect(client)
        .donate(tx.hash, { value: ethers.utils.parseEther("1") });
      const balance = await ethers.provider.getBalance(notebook.address);
      expect(balance.toString()).to.equal(ethers.utils.parseEther("1"));
    });
  });
  describe("mint", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await notebook
        .connect(owner)
        .createNote(client.address, content);
      await tx.wait();
      const mintTx = await notebook
        .connect(owner)
        .mint(client.address, tx.hash);
      await mintTx.wait();
      const ownerAddress = await notebook.ownerOf(tx.hash);
      expect(ownerAddress).to.equal(client.address);
    });
    it("should revert by ownership", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await notebook
        .connect(owner)
        .createNote(client.address, content);
      const mintTx = notebook.connect(client).mint(client.address, tx.hash);
      await expect(mintTx).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
  // we create the note content on transaction data, and get the content from transaction data by parameters
  // so we don't have to store the data on storage, it can reduce the gas.
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
      const tx = await notebook
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
      const tx = notebook.connect(creator).createNote(creator.address, content);
      await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
