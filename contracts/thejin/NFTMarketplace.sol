pragma solidity ^0.8.4;

import "@openzepplin/contracts/token/ERC721/ERC721.sol";
import "@openzepplin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzepplin/contracts/token/ERC721/ReentrancyGuard.sol"; // Adding a layer of security to avoid the sender initiating 
    // Multiple instances of the same transactions...this avoid the the re entrancy attack.


// arrays in solidity are not dynamic
contract NFTMarket is ReentrancyGuard{
    using Counters  for Counters.Counter;
    Counters.Counter private _tokenIds; // Basically providing unique ids for the ID
    Counters.Counter private _itemsSold;

    address payable owner; // A commission is paid to the owner of the smartcontract. More like a listing fee!
    uint256 listingPrice = 0.025 ether; // The price of the listing fee.
    
    constructor(){
        owner  = payable(msg.sender); // The owner of the smartcontract is the sender of the transaction.
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    
    mapping(uint256 =>  MarketItem) private idToMarketItem; // Mapping between the ItemId and the Item itself. More like a hashmap[]

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    ); //event used for frontend application

    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }

}
