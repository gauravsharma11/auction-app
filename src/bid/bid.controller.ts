// bid.controller.ts
import { Controller, Post, Body, Param, Get, LoggerService, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AuctionService } from 'src/auction/auction.service';
import { AuctionItem } from 'src/auction/auction-item.schema';

@Controller('bids')
export class BidController {

  private readonly logger = new Logger(BidController.name);

  constructor(
    private readonly auctionService: AuctionService  ) {}
  @Post()
  async placeBid(
    @Body('auctionItemId') auctionItemId: string,
    @Body('maxAutoBidAmount') maxAutoBidAmount: number,
    @Body('bidderName') bidderName: string,
  ): Promise<AuctionItem | null> {
    try {
      const auctionItem = await this.auctionService.getAuctionItemById(auctionItemId);
      if (!auctionItem) {
        throw new NotFoundException('Auction item not found.');
      } else {
      const updatedItem = await this.auctionService.placeBid(auctionItemId, maxAutoBidAmount, bidderName);
      return updatedItem;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }


  }
}
