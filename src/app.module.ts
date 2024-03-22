import { Module } from '@nestjs/common';
import { AuctionController } from './auction/auction-item.controller';
import { BidController } from './bid/bid.controller';
import { AuctionService } from './auction/auction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionItemSchema } from './auction/auction-item.model';
import { BidSchema } from './bid/bid.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auctionDB?directConnection=true', {}),
    MongooseModule.forFeature([{ name: 'AuctionItem', schema: AuctionItemSchema }]),
    MongooseModule.forFeature([{ name: 'Bid', schema: BidSchema }]),
  ],
  controllers: [AuctionController, BidController],
  providers: [AuctionService],
})
export class AppModule {}
