// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract NFTMarketplace is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    //arrays for nft's [bought,created,unsold]

    address payable owner;
    uint256 listingPrice = 0.025 ether; //Here ether is matic(0.025 matic), if its ether, then its a high listing fee

    constructor(){
        owner = payable(msg.sender);
    }

    struct MarketItem{
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    //indexed is used in logging events. It acts as filters. Using indexed parametrs, we can search the event
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

    function createMarketItem(address nftContract, uint256 tokenId, uint256 price)public payable nonReentrant{
        require(price > 0,"Price must be atleast 1 wei");
        require(msg.value == listingPrice, "price must be equal to listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)), // Null address
            price,
            false
        );
        //seller: creating market item means putting item for sale. seller(msg.sender) is selling his nft(tokeId)
        //owner. After listing in market, currently there is no owner, so owner address is null here 


        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId); // ?? address(this) is nftContractAddress
        emit MarketItemCreated(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant{
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;

        require(msg.value == price,"Please submit the asking price in order to complete the transaction");
        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(listingPrice); //commission
    }

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex=0;
        MarketItem[] memory result = new MarketItem[](unsoldItemCount);

        for (uint i=0;i<itemCount;i++){
            if(idToMarketItem[i+1].sold==false){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem= idToMarketItem[currentId];
                result[currentIndex]=currentItem;
                currentIndex +=1;
            }
        }
        return result;
    }

    function fetchMyNFTs() public view returns(MarketItem[] memory){
        uint totalItemCount = _itemIds.current();
        uint itemCount =0;
        uint currentIndex = 0;

        for (uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].owner==msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory result = new MarketItem[](itemCount);
        for (uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].owner==msg.sender){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem= idToMarketItem[currentId];
                result[currentIndex]=currentItem;
                currentIndex +=1;
            }
        }
        return result;
    }

    function fetchItemsCreated() public view returns(MarketItem[] memory){
        uint totalItemCount = _itemIds.current();
        uint itemCount =0;
        uint currentIndex = 0;

        for (uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].seller==msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory result = new MarketItem[](itemCount);
        for (uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].seller==msg.sender){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem= idToMarketItem[currentId];
                result[currentIndex]=currentItem;
                currentIndex +=1;
            }
        }
        return result;
    }
}