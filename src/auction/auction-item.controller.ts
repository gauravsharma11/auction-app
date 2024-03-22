
import { Controller, Get, Post, Body, Param, NotFoundException, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionItem } from './auction-item.model';

@Controller('auctionItems')
export class AuctionController {

  private readonly logger = new Logger(AuctionController.name);

  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  async getAllAuctionItems(): Promise<AuctionItem[]> {
    this.logger.log('Fetching all auction items');
    return this.auctionService.getAllAuctionItems();
  }

  @Get(':auctionItemId')
  async getAuctionItemById(@Param('auctionItemId') auctionItemId: string): Promise<AuctionItem> {

    this.logger.log('Fetching auction item');
    const auctionItem = await this.auctionService.getAuctionItemById(auctionItemId);
    if (!auctionItem) {
      throw new NotFoundException('Auction item not found.');
    }
    return auctionItem;
  }

  @Post()
  async createAuctionItem(
    @Body('auctionItemId') auctionItemId: string,
    @Body('currentBid') currentBid: number,
    @Body('reservePrice') reservePrice: number,
    @Body('itemId') itemId: string,
    @Body('description') description: string
  ): Promise<String> {
    try {
      this.logger.log("Creating Auction Item" + itemId + description);
      const auctionItem = await this.auctionService.createAuctionItem(auctionItemId, currentBid, reservePrice, itemId, description);
      this.logger.log("Auction Item Id: "+auctionItem.auctionItemId);
      return auctionItem.auctionItemId;
    } catch (error) {
      throw new ConflictException('Auction item already exists.');
    }
  }

  @Post(':auctionItemId/bids')
  async placeBid(
    @Param('auctionItemId') auctionItemId: string,
    @Body('maxAutoBidAmount') maxAutoBidAmount: number,
    @Body('bidderName') bidderName: string
  ): Promise<AuctionItem> {

    let updatedItem = null;
    const auctionItem = await this.auctionService.getAuctionItemById(auctionItemId);
    if (!auctionItem) {
      throw new NotFoundException('Auction item not found.');
    } else {
      try{
        updatedItem = await this.auctionService.placeBid(auctionItemId, maxAutoBidAmount, bidderName);
      }
      catch(error){
          throw new NotFoundException(error.message);
      }
    }

    return updatedItem;
  }
}
