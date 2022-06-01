# Blockchain Engineer Written Challenge

Please choose _Section 1_ or _Section 2_ and answer all questions in that section. You can directly write your answers in your branch following the questions.


## Section 2

Assuming we are designing the protocol for a social media. User can follow each other, publish content, and reply to content with data stored on-chain.

- Question 1: How would you design the smart contract to make the gas fee as low as possible?
>For publish content, I will create the empty function let client call when published. And decode post's content within transaction's raw data.

>For follow each other, I will create the mapping to store the data, and get following person from mapping.
- Question 2: How would you choose a public chain that is affordable and scalable?
>Scalability: With the rapid growth of the blockchain, choose a blockchain that can accommodate more transactions, make transactions faster, and scale at a high speed.

>Community Support: More community resources can help us find answers when we encounter difficulties or need to find someone to discuss, which also means that the blockchain will develop better

>Security: Whether the platform's code has been repeatedly reviewed.

>Based on the above, I will choose the Ethereum.
- Question 3: How would you connect client software to the blockchain?
>Some operations will go directly through web3.js. Some will pass through a centralized server

- Question 4: How would you design the system so that it is backward compatible when you upgrade it in the future?
>Create Proxy Contract to pass the transaction to target contract. And if we want to upgrade contract, we just set the new target contract's address to proxy contract.And maybe we can define the interface that let contract have to implement.

## Section 1

Assuming we are implementing a 1000X1000 pixel board on-chain. Users can trade pixels, and pixel owners can update the color of the pixel. Client software can then render our the state of the pixel board.

- Question 1: How would you design the smart contract to make the gas fee as low as possible?
> I will make each 1X1 pixel have their own id, and we have to mapping:
> ```mapping(userId => pixelId)``` ``` mapping(pixelId => color)```
> so we can change the color in mapping
- Question 2: How would you choose a public chain that is affordable and scalable?
- Question 3: How would you connect client software to the blockchain, so that it can render millions of pixels in a short amount of time? For example, what node provider would you choose and why, and are there any middleware or indexing infracture you would use or implement?
