# Blockchain Engineer Code Challenge

Assuming we are designing an on-chain notebook for EVM, where each notebook is an ERC-721 token. Please write Solidity contracts with the below features, and add enough comments to demonstrate your design.

This repo is scaffolded with basic tools, but you are free to use toolset of your choice.

## Required features

1. Owner of each notebook can write content into it, stored on-chain.
   > create the content with transaction data,
   so we don't have to store content in contract's storage
   we get the transaction hash as tokenID
   and get the transaction raw data from chain by tx hash.
   and get content by decode parameter from tx raw data

2. Clients can retrieve content by the token id of notebook.
   >Because our token id is transaction hash, so get the transaction raw data from chain by tx hash.
   and get content by decode parameter from tx raw data
3. Notebooks can receive donations which can be withdrawn by the owner.
   >Using mapping to store the donation for each token id, and draw the donation from mapping. 
4. User can write content with meta transactions so that gas fee could be paid by a third-party.
   >There have some gasless solution like OpenGSN to relay call.
    And I try to make other ideas.
    * Solution 1 :Creator can only create note and mint via contract's owner.
      This approach allows the fee to be paid only by the owner.
      But the disadvantage is that it must interact with the contract through a centralized server which build by owner. 
    * Solution 2 :we set expected gas used and multiply tx gas price to get the gas fee. and refund the gas fee to user.
      To Be Solved: We cannot accurately predict Gas used , if we can handle Gas used , then we can refund gas fee correctly.for this solution checkout on pull request: [PR](https://github.com/kenpingshu/notebook-blockchain/pull/3)
5. Unit tests for major contract APIs.

## Bouns features

1. A proxy contract that relays calls to logic contract, so that logic contract is upgradable in the future.
   > Using delegateCall in proxy contract
2. Deploy a test contract on Rinkeby Testnet.

   [Notebook Contract](https://rinkeby.etherscan.io/address/0xDB6455D1053AFA5F33dFb7607e239246FeBFf508)

   [Proxy Contract](https://rinkeby.etherscan.io/address/0xb87496f41Dfd754c690f2e068d202686E5285ED4)
