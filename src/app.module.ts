import { Module } from '@nestjs/common';
import { AuctionController } from './auction/auction-item.controller';
import { BidController } from './bid/bid.controller';
import { AuctionService } from './auction/auction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionItemSchema } from './auction/auction-item.model';
import { BidSchema } from './bid/bid.model';
import { ValidationService } from './ValidationService';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodbapp:27017/'),
    MongooseModule.forFeature([{ name: 'AuctionItem', schema: AuctionItemSchema }]),
    MongooseModule.forFeature([{ name: 'Bid', schema: BidSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AuctionController, BidController],
  providers: [AuctionService, ValidationService],

})



export class AppModule {}
