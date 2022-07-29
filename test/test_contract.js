
const moment = require('moment');

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

    const [_, buyerAddress] = await ethers.getSigners()

    
    let date1 = moment('07-29-2022 18:50', 'MM-DD-YYYY HH:mm').valueOf();
    // let date2 = moment('07-29-2022 18:50', 'MM-DD-YYYY HH:mm').valueOf();
    await nftMarketplace.createToken(auctionPrice,date1, { value: listingPrice });

    let date2 = moment('07-29-2022 18:45', 'MM-DD-YYYY HH:mm').valueOf();

    await nftMarketplace.createToken(auctionPrice,date2, { value: listingPrice });
    let date3 = moment('07-29-2022 18:39', 'MM-DD-YYYY HH:mm').valueOf();
    await nftMarketplace.createToken(auctionPrice,date3, { value: listingPrice });

    await nftMarketplace.connect(buyerAddress).createMarketSale(3, { value: auctionPrice })
    items = await nftMarketplace.connect(buyerAddress).fetchMyNFTs();
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)

  })
})