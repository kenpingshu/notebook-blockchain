import "@nomiclabs/hardhat-web3";
import { ethers, web3, expect } from "hardhat";
import { Notebook } from "../typechain";

let notebook: Notebook;

beforeEach(async () => {
  const Notebook = await ethers.getContractFactory("Notebook");
  notebook = await Notebook.deploy("Notebook", "NBK");
  await notebook.deployed();
  const [owner] = await ethers.getSigners();

  // Create a transaction object
  const tx = {
    to: notebook.address,
    value: ethers.utils.parseEther("1000"),
  };
  await owner.sendTransaction(tx);
});

describe("Notebook", function () {
  describe("draw", async () => {
    it("should success", async function () {
      const [owner, client, client2] = await ethers.getSigners();
      // console.log(await client.getBalance());
      const content = "this is content";
      const tx = await notebook.connect(client).createNote(content);
      await tx.wait();
      // console.log(await client.getBalance());
      const mintedTx = await notebook.connect(client).mint(tx.hash);
      await mintedTx.wait();
      // console.log(await client.getBalance());
      const donateTx = await notebook.connect(client2).donate(tx.hash, {value: ethers.utils.parseEther("20")});
      await donateTx.wait();
      console.log(ethers.utils.formatEther(await client.getBalance()));
      const drawTx = await notebook.connect(client).draw();
      await drawTx.wait();
      console.log(ethers.utils.formatEther(await client.getBalance()));
      // const balance = await ethers.provider.getBalance(notebook.address);
      // console.log(balance);
    });
  });
  describe("donate", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();

      const content = "this is content";
      const tx = await notebook.connect(client).createNote(content);
      await tx.wait();
      const mintedTx = await notebook.connect(client).mint(tx.hash);
      await mintedTx.wait();
      const beginningBalance = await ethers.provider.getBalance(
        notebook.address
      );
      await notebook.connect(client).donate(tx.hash, {value: ethers.utils.parseEther("1")});
      const balance = await ethers.provider.getBalance(notebook.address);
      expect(balance.toString()).to.equal(
        ethers.utils.parseEther("1").add(beginningBalance)
      );
    });
  });
  describe("mint", async () => {
    it("should success", async function () {
      const [owner, client] = await ethers.getSigners();
      const content = "this is content";
      const tx = await notebook.connect(client).createNote(content);
      await tx.wait();
      await notebook.connect(client).mint(tx.hash);
    });
  });
  // we create the note content on transaction data, and get the content from transaction data by parameters
  // so we don't have to store the data on storage, it can reduce the gas.
  describe("create", function () {
    it("should success", async function () {
      // Do something with the accounts
      const [owner, client] = await ethers.getSigners();
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
      const beginningBalance = ethers.utils.formatEther(
        await client.getBalance()
      );
      // console.log(o);
      const tx = await notebook.connect(client).createNote(content);
      const r = await tx.wait();
      console.log(beginningBalance);
      // console.log(r);
      const getTx = await ethers.provider.getTransaction(tx.hash);
      const inputData = "0x" + getTx.data.slice(10);
      const params = web3.eth.abi.decodeParameters(["string"], inputData);
      expect(params["0"]).to.equal(content);
      expect(ethers.utils.formatEther(await client.getBalance())).to.equal(
        beginningBalance
      );
    });
  });
});
