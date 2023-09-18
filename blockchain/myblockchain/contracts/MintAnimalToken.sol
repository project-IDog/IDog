// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("sunnniAnimal", "SAS") {}

    mapping(uint256 => uint256) public animalTypes;

    function mintAnimaToken() public {
        uint256 animalTokenId = totalSupply() +1;

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) %5 +1; //solidity에서 랜덤뽑아내기

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId);
    }
}

