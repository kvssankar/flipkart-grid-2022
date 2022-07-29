describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /*
    const games = await ethers.getContractFactory("Games");
    
    const games_ = await games.deploy();
    await games_.deployed();

    const [_1,_2,_3] = await ethers.getSigners()
    games_.awardItem(_1.address);
    games_.awardItem(_2.address);

    // games_.print(2);
    console.log(_1.address,_2.address);
    games_.connect(_1).burn(0);
    games_.connect(_1).print(0)
    */

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    let listingPrice = await nftMarketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    // /* create two tokens */
    // await nftMarketplace.createToken(auctionPrice, { value: listingPrice })
    // await nftMarketplace.createToken( auctionPrice, { value: listingPrice })
      
    const [_, buyerAddress] = await ethers.getSigners()

    
    await nftMarketplace.connect(_).createToken(auctionPrice, { value: listingPrice })
    await nftMarketplace.connect(_).createToken( auctionPrice, { value: listingPrice })
      

  //   nftMarketplace.burnNFT(1);

  //   /* execute sale of token to another user */
    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    console.log(buyerAddress.address);
    nftMarketplace.connect(buyerAddress).print(1);
    // nftMarketplace.connect(buyerAddress).burnNFT(1);
    // nftMarketplace.connect(buyerAddress).print(1);
    // nftMarketplace.connect(_).print(0);

  //   /* resell a token */
  //   // await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })
  //   /* query for and return the unsold items */
    
  //   items = await nftMarketplace.fetchItemsListed();
  //   items = await Promise.all(items.map(async i => {
  //     const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
  //     let item = {
  //       price: i.price.toString(),
  //       tokenId: i.tokenId.toString(),
  //       seller: i.seller,
  //       owner: i.owner,
  //       tokenUri
  //     }
  //     return item
  //   }))
  //   console.log('items: ', items)
  })
})