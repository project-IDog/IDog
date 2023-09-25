// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintIDogToken is ERC721URIStorage , Ownable  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("IDogProfile", "IDOGNFT") {}

    function mintDogProfile(address dogOwner, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        uint256 newIDogId= _tokenIds.current();
        _mint(dogOwner, newIDogId);
        _setTokenURI(newIDogId, tokenURI); 

        _tokenIds.increment();
        return newIDogId;
    }

}