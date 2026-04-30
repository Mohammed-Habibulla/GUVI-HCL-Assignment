2. Digital Art Marketplace & NFT Trading Platform
2. Collection Design
 Users
{
  _id: ObjectId(),
  name: "Alice",
  email: "alice@email.com",
  wallet_address: "0xABC123",
  role: "Artist" // Artist / Buyer
}
 Collections (Art Collections)
{
  _id: ObjectId(),
  name: "Modern Art",
  creator_id: ObjectId(),
  description: "Digital paintings collection"
}
 NFTs
{
  _id: ObjectId(),
  title: "Sunset Art",
  creator_id: ObjectId(),
  collection_id: ObjectId(),
  metadata: {
    format: "PNG",
    resolution: "4K",
    size: "5MB"
  },
  current_owner: ObjectId(),
  price: 2.5, // ETH
  created_at: ISODate(),
  ownership_history: [
    {
      owner_id: ObjectId(),
      acquired_at: ISODate(),
      price: 0
    }
  ]
}
 Transactions
{
  _id: ObjectId(),
  nft_id: ObjectId(),
  buyer_id: ObjectId(),
  seller_id: ObjectId(),
  price: 2.5,
  transaction_type: "Sale", // Sale / Auction
  timestamp: ISODate()
}
 Auctions
{
  _id: ObjectId(),
  nft_id: ObjectId(),
  seller_id: ObjectId(),
  starting_price: 1.0,
  current_bid: 2.5,
  highest_bidder: ObjectId(),
  start_time: ISODate(),
  end_time: ISODate(),
  status: "Active" // Active / Closed
}
 2. Insert Sample Data
Insert NFT with Ownership History
db.NFTs.insertOne({
  title: "Sunset Art",
  creator_id: ObjectId("artist1"),
  collection_id: ObjectId("collection1"),
  metadata: {
    format: "PNG",
    resolution: "4K",
    size: "5MB"
  },
  current_owner: ObjectId("user1"),
  price: 1.5,
  created_at: new Date(),
  ownership_history: [
    {
      owner_id: ObjectId("artist1"),
      acquired_at: new Date("2025-01-01"),
      price: 0
    },
    {
      owner_id: ObjectId("user1"),
      acquired_at: new Date("2025-02-01"),
      price: 1.5
    }
  ]
});
 3. Query: Ownership History of NFT
db.NFTs.find(
  { _id: ObjectId("nft1") },
  { ownership_history: 1, _id: 0 }
);

 Explain:

Fetch only ownership_history
Shows complete transfer chain
 4. Updates
 (A) Transfer Ownership After Sale
db.NFTs.updateOne(
  { _id: ObjectId("nft1") },
  {
    $set: { current_owner: ObjectId("user2") },
    $push: {
      ownership_history: {
        owner_id: ObjectId("user2"),
        acquired_at: new Date(),
        price: 2.0
      }
    }
  }
);
 (B) Update Auction Status
db.Auctions.updateOne(
  { _id: ObjectId("auction1") },
  {
    $set: {
      status: "Closed",
      current_bid: 3.0
    }
  }
);
 5. Aggregation Queries
 (A) Top-Selling NFTs
db.Transactions.aggregate([
  {
    $group: {
      _id: "$nft_id",
      total_sales: { $sum: "$price" }
    }
  },
  { $sort: { total_sales: -1 } },
  { $limit: 5 }
]);
 (B) Total Sales Volume
db.Transactions.aggregate([
  {
    $group: {
      _id: null,
      total_volume: { $sum: "$price" }
    }
  }
]);
 (C) Most Active Traders
db.Transactions.aggregate([
  {
    $group: {
      _id: "$buyer_id",
      transactions_count: { $sum: 1 }
    }
  },
  { $sort: { transactions_count: -1 } },
  { $limit: 5 }
]);