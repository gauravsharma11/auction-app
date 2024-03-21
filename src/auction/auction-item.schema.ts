// auction-item.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Item {
  itemId: string;
  description: string;
}

@Schema()
export class AuctionItem extends Document {
  @Prop()
  auctionItemId: string;

  @Prop({ default: 0 })
  currentBid: number;

  @Prop({ required: true })
  reservePrice: number;

  @Prop({ required: true, type: Object })
  item: Item;
}

export const AuctionItemSchema = SchemaFactory.createForClass(AuctionItem);
