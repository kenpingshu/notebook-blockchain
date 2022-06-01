//SPDX-License-Identifier: Apache-2
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Proxy is ERC721, Ownable{
    uint256 public _totalSupply = 0;
    mapping (address => uint256) public donations;
    address public destination;

    constructor(address _dest) ERC721("Notebook", "NBK") {
        // initialize Notebook with total supply etc.
        destination = _dest;

    }

    function setDestination(address _dest) external {
        destination = _dest;
    }

    function createNote(address _creator,string memory _content) external {
        (bool success,) = destination.delegatecall(
            abi.encodeWithSignature("createNote(address,string)", _creator, _content)
        );
        require(success, "create note fail");
        //    console.log(msg.sender);
        //    Notebook(destination).createNote(_creator, _content);
    }

    function mint(address creator, uint256 tokenId) external {
        (bool success,) = destination.delegatecall(
            abi.encodeWithSignature("mint(address,uint256)", creator, tokenId)
        );
        require(success, "mint fail");
    }

    function donate(uint256 tokenId) external payable {
        (bool success,) = destination.delegatecall(
            abi.encodeWithSignature("donate(uint256)", tokenId)
        );
        require(success, "donate fail");
    }

    function draw() external {
        (bool success,) = destination.delegatecall(
            abi.encodeWithSignature("draw()")
        );
        require(success, "draw fail");
    }
}