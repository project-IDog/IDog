// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "SaleAnimalToken.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("sunnniAnimal", "SAS") {}

    SaleAnimalToken public saleAnimalToken;

    mapping(uint256 => uint256) public animalTypes;

    struct AnimalTokenData{
        uint256 animalTokenId;
        uint256 animalType;
        uint256 animalPrice;
    }

    function mintAnimaToken() public {
        uint256 animalTokenId = totalSupply() +1;

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) %5 +1; //solidity에서 랜덤뽑아내기

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId);
    }

    function getAnimalTokens(address _animalTokenOwner) view public returns(AnimalTokenData[] memory) {

        uint256 balanceLength = balanceOf(_animalTokenOwner);

        require(balanceLength == 0, "Owner did not have token");

        for(uint256 i=0; i<balanceLength; i++) {
            uint256 animalTokenId = tokenOfOwnerByIndex(_animalTokenOwner ,i);
            uint256 animalType = animalTypes[animalTokenId];
            uint256 animalPrice = saleAnimalToken.getAnimalTokenPrice(animalTokenId);
        }
    }

    function setSaleAnimalToken(address _saleAnimalToke) public {
        saleAnimalToken
    }

}
