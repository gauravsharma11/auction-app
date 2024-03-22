import { Injectable } from '@nestjs/common';
import { AuctionItem } from './auction/auction-item.model';
import { Bid } from './bid/bid.model';

@Injectable()
export class ValidationService {
  validateAuctionItemData(data: Partial<AuctionItem>): AuctionItem {
    const auctionItem: AuctionItem = {
      auctionItemId: data.auctionItemId || '',
      currentBid: data.currentBid || 0,
      reservePrice: data.reservePrice || 0,
      item: {
        itemId: data.item?.itemId || '',
        description: data.item?.description || '',
      },
    };

    // Validate auctionItemId is not empty
    if (!auctionItem.auctionItemId) {
      throw new Error('AuctionItemId is required');
    }

    // Validate reservePrice is non-negative
    if (auctionItem.reservePrice < 0) {
      throw new Error('ReservePrice must be non-negative');
    }

    return auctionItem;
  }

  validateBidData(data: Partial<Bid>): Bid {
    const bid: Bid = {
      auctionItemId: data.auctionItemId || '',
      maxAutoBidAmount: data.maxAutoBidAmount || 0,
      bidderName: data.bidderName || '',
    };

    // Validate auctionItemId is not empty
    if (!bid.auctionItemId) {
      throw new Error('AuctionItemId is required');
    }

    // Validate maxAutoBidAmount is non-negative
    if (bid.maxAutoBidAmount < 0) {
      throw new Error('MaxAutoBidAmount must be non-negative');
    }

    if (bid.bidderName.length === 0) {
        throw new Error('BidderName should not be empty');
      }

    return bid;
  }
}
