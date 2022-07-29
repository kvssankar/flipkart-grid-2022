pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";


contract Games is ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "ITM") {
    }
    

    function awardItem(address player) public returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        console.log(player,_tokenIds.current());
        _tokenIds.increment();
        return 0;
    }



    function print(uint256 tokenId) public view{
        console.log("Owner of the token is: ");
        console.log(ERC721.ownerOf(tokenId), _tokenIds.current());

    }
}
