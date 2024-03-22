// bid.controller.ts
import { Controller, Post, Body, Param, Get, LoggerService, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AuctionService } from './../auction/auction.service';
import { AuctionItem } from './../auction/auction-item.model';
import { ValidationService } from './../ValidationService';

@Controller('bids')
export class BidController {

  private readonly logger = new Logger(BidController.name);

  constructor(
    private readonly auctionService: AuctionService, 
    private readonly validationService: ValidationService  ) {}
  @Post()
  async placeBid(
    @Body('auctionItemId') auctionItemId: string,
    @Body('maxAutoBidAmount') maxAutoBidAmount: number,
    @Body('bidderName') bidderName: string,
  ): Promise<AuctionItem | null> {
    try {

      const data = {
        auctionItemId, maxAutoBidAmount, bidderName
      }

      const sanitizedData = this.validationService.validateBidData(data);

      const auctionItem = await this.auctionService.getAuctionItemById(sanitizedData.auctionItemId);
      if (!auctionItem) {
        throw new NotFoundException('Auction item not found.');
      } else {
      const updatedItem = await this.auctionService.placeBid(sanitizedData.auctionItemId, 
        sanitizedData.maxAutoBidAmount, sanitizedData.bidderName);
      return updatedItem;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }
}
