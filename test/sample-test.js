/* test/sample-test.js */


describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    let listingPrice = await nftMarketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nftMarketplace.createToken("https://www.mytokenlocation.com", auctionPrice,"mongoId1", { value: listingPrice })
    await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice,"mongoId2", { value: listingPrice })
    await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice,"mongoId3", { value: listingPrice })
      
    const [_, buyerAddress] = await ethers.getSigners()
  
    /* execute sale of token to another user */
    await nftMarketplace.connect(buyerAddress).createMarketSale(1,100, { value: auctionPrice })
    
    await nftMarketplace.connect(buyerAddress).createMarketSale(2,100, { value: auctionPrice })

    // /* resell a token */
    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, 101,{ value: listingPrice })

    // /* query for and return the unsold items */
    items = await nftMarketplace.fetchMarketItems()
    // console.log(items)
    items = await Promise.all(items.map(async i => {
      // const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
      console.log(i.burn)
      if(i.burn == false){
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          id : i.mongoid
        }
        return item
      }
    }))
    console.log('items: ', items)
  })
})