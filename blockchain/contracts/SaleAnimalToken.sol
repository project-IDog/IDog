// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress; // 배포한 주소값

    constructor(address _mintAnimalTokenAddress){
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    mapping (uint256 =>  uint256) public animalTokenPrices;

    uint256[] public onSaleAnimalTokenArray;

    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public{
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(animalTokenOwner == msg.sender, "Caller is not animal token owner");
        require(_price > 0, "Price is not zero or lower");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale ");
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token");

        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not sale");
        require(price <= msg.value, "Caller sent lower than price");
        require(animalTokenOwner != msg.sender, "Caller is animal token owner");

        payable (animalTokenOwner).transfer(msg.value); //창작자에게 돈을 보냄
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId); //nft는 구매자에게로 이동 (창작자 -> 구매자)

        //판매 완료한 NFT는 판매리스트에서 빼야한다.
        animalTokenPrices[_animalTokenId] = 0;

        for(uint256 i=0; i< onSaleAnimalTokenArray.length; i++ ) {
            if(animalTokenPrices[onSaleAnimalTokenArray[i]]==0) {
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1]; //판 위치에 마지막 아이템넣고
                onSaleAnimalTokenArray.pop(); //맨 마지막 아이템 빼기
            }
        }

    }

    function getOnSaleAnimalTokenArrayLength() view public returns(uint256) {
            return onSaleAnimalTokenArray.length;
    }

}

