import { Test, TestingModule } from "@nestjs/testing";
import { AuctionController } from "./../src/auction/auction-item.controller";
import { AuctionService } from "./../src/auction/auction.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { AuctionItem, AuctionItemSchema } from "./../src/auction/auction-item.model";
import { getModelToken } from "@nestjs/mongoose";
import { Bid } from "./../src/bid/bid.model";



describe("AuctionController", () => {
  let auctionService: AuctionService;
  let model: Model<AuctionItem>;
  const auctionItemStub: AuctionItem = new AuctionItem();
  auctionItemStub.auctionItemId = '1';
  auctionItemStub.currentBid = 100;
  auctionItemStub.reservePrice = 200;
  auctionItemStub.item = {
        itemId: '1',
        description: 'Item 1'
    };

    const mockAuctionService = {
      find: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      getAllAuctionItems: jest.fn(),
      getAuctionItemById: jest.fn(),
      createAuctionItem: jest.fn(),
      placeBid: jest.fn(),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuctionService, 
          { 
            provide: getModelToken(AuctionItem.name),
            useValue: jest.fn()
          }, 
        {
          provide: getModelToken(Bid.name),
          useValue: jest.fn()
        }],
      }).compile();
  
      auctionService = module.get<AuctionService>(AuctionService);
      model = module.get<Model<AuctionItem>>(getModelToken(AuctionItem.name));
    });

    
  it('should be defined', () => {
    expect(auctionService).toBeDefined();
  });

  describe('getAllAuctionItems', () => {
    it('should return all auction items', async () => {
      jest.spyOn(auctionService, 'getAllAuctionItems').mockResolvedValue([auctionItemStub]);

      expect(await auctionService.getAllAuctionItems()).toHaveLength(1);
    });
  });

  describe('getAuctionItemById', () => {
    it('should return the auction item with the given ID', async () => {
      const auctionItem = { id: '1', name: 'Item 1' };
      jest.spyOn(auctionService, 'getAuctionItemById').mockResolvedValue(auctionItemStub);

      expect(await auctionService.getAuctionItemById('1')).toBeTruthy();
    });

    it('should return null if no item is found with the given ID', async () => {
      jest.spyOn(auctionService, 'getAuctionItemById').mockResolvedValue(null);

      expect(await auctionService.getAuctionItemById('999')).toBeNull();
    });
  });

  describe('createAuctionItem', () => {
    it('should create a new auction item', async () => {
      jest.spyOn(auctionService, 'createAuctionItem').mockResolvedValue(auctionItemStub);

      expect(await auctionService.createAuctionItem(auctionItemStub.auctionItemId, auctionItemStub.currentBid,
        auctionItemStub.reservePrice, auctionItemStub.item.itemId, auctionItemStub.item.itemId)).toBe(auctionItemStub);
    });
  });

  describe('placeBid', () => {
    it('should place a bid on the auction item', async () => {
      const bid = new Bid();
      bid.auctionItemId = '1';
      bid.bidderName='Gaurav';
      bid.maxAutoBidAmount = 750.0;
      jest.spyOn(auctionService, 'placeBid').mockResolvedValue(auctionItemStub);

      expect(await auctionService.placeBid(bid.auctionItemId, bid.maxAutoBidAmount, bid.bidderName)).toBe(auctionItemStub);
    });
  });
});