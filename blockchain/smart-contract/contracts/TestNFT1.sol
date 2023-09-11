// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol'; 
import '@openzeppelin/contracts/utils/Counters.sol';

contract TestNFT1 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TestNFT1", "TestNFT1") {}

    function mintNFT(address recipient, string memory uri) external returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(recipient, tokenId); //민팅한사람, 토큰 아이디
        _setTokenURI(tokenId, uri);

        return tokenId;
    }
}
