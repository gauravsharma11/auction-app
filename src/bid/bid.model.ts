import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Bid {
  @Prop({ required: true })
  auctionItemId: string;

  @Prop({ required: true })
  maxAutoBidAmount: number;

  @Prop({ required: true })
  bidderName: string;
}


export const BidSchema = SchemaFactory.createForClass(Bid); 