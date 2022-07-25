pragma solidity ^0.8.4;

 import "@openzepplin/contracts/token/ERC721/ERC721.sol";
 import "@openzepplin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// ERC721 is the protocol by which an NFT is uniquely identified!

 contract NFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Basically providing unique ids for the ID 
    address contractAddress;  // Address of the marketplace where the NFT can interact 

    constructor(address marketplaceAddress)  ERC721("Metaverse Tokens", "METT"){
        contractAddress = marketplace; 
    }

    function createToken(string memory tokenURI) public returns (uint){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId); // msg.sender => Identification of the author
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true); // Important to transfer the ownership of the token in the marketplace
        return newItemId; // For the purpose of frontend...
    }


 }
