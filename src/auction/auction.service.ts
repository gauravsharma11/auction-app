import { BadRequestException, Injectable, InternalServerErrorException, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionItem } from './auction-item.model';
import ShortUniqueId from 'short-unique-id';
import { Bid } from 'src/bid/bid.model';

const { randomUUID } = new ShortUniqueId({ length: 10 });

@Injectable()
export class AuctionService {

  
  private readonly logger = new Logger(AuctionService.name);

  constructor(@InjectModel('AuctionItem') private readonly auctionItem: Model<AuctionItem>,
  @InjectModel(Bid.name) private readonly bidModel: Model<Bid>) {}

  async getAllAuctionItems(): Promise<AuctionItem[]> {
    return this.auctionItem.find().exec();
  }

  async getAuctionItemById(auctionItemId: string): Promise<AuctionItem | null> {
    return this.auctionItem.findOne({ "auctionItemId" : auctionItemId }).exec();
  }

  async createAuctionItem(auctionItemId: string, currentBid: number, reservePrice: number, itemId: string, description: string): Promise<AuctionItem> {
    auctionItemId = randomUUID();
    const newItem = new this.auctionItem({ auctionItemId, currentBid, reservePrice, item: { itemId, description } });
    return newItem.save();
  }

  async placeBid(auctionItemId: string, maxAutoBidAmount: number, bidderName: string): Promise<AuctionItem | null> {
    try {
      this.logger.log("Auction Item Id: "+auctionItemId);
      const item = await this.auctionItem.findOne({ "auctionItemId" : auctionItemId }).exec();
      if (!item) {
        throw new NotFoundException("Auction Id is not present")
      }

      this.logger.log("Reserve Price: "+ item.reservePrice);
     
      // Check if the current bid meets the reserve price
      if (item.reservePrice > maxAutoBidAmount) {
        this.logger.error('Bid does not meet the reserve price.');
        throw new BadRequestException('Bid does not meet the reserve price.');
      }
      
      // Rule 2: Once reserve price is met, max auto-bid amount becomes the bid amount
      let bidAmount = maxAutoBidAmount;
      if (item.reservePrice <= item.currentBid) {
          // Rule 3: Incremental bidding
          bidAmount = Math.max(item.currentBid + 1, maxAutoBidAmount);
      }

      const bidItem = await this.bidModel.findOne({ "auctionItemId" : auctionItemId }).exec();

       // Rule 4: Check if the current bidder is outbid
      if (bidItem && bidAmount > item.currentBid) {
      // Broadcast outbid notification to the previous bidder
        if (bidItem.bidderName && bidItem.bidderName !== bidderName) {
            // Notify the previous bidder that they have been outbid
            this.logger.log(`Bidder ${bidItem.bidderName} has been outbid.`);
        }
      }
      // Determine the winning bidder and update the current bid
      const updatedItem = await this.auctionItem.findOneAndUpdate(
        { "auctionItemId" : auctionItemId },
        { currentBid: bidAmount, bidderName },
        { new: true }
      ).exec();
      
          // Log the bid in the bid collection
      const bid = new this.bidModel({ auctionItemId, maxAutoBidAmount, bidderName });
      await bid.save();
      this.logger.log(`Bid placed for item ${auctionItemId} by ${bidderName} with amount ${bidAmount}`);
      
      return updatedItem;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
