import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bid extends Document {
  @Prop({ required: true })
  auctionItemId: string;

  @Prop({ required: true })
  maxAutoBidAmount: number;

  @Prop({ required: true })
  bidderName: string;
}


export const BidSchema = SchemaFactory.createForClass(Bid); 