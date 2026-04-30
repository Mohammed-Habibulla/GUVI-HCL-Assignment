//problem-2. Digital Art Marketplace & NFT Trading Platform
//1. Create Collections
//use nft_marketplace

db.createCollection("Users")
db.createCollection("NFTs")
db.createCollection("Collections")
db.createCollection("Transactions")
db.createCollection("Auctions")
// 2. Insert Sample Data
// Users
db.Users.insertMany([
  { _id: 1, name: "Alice", role: "Artist" },
  { _id: 2, name: "Bob", role: "Buyer" },
  { _id: 3, name: "Charlie", role: "Collector" }
])
// Collections
db.Collections.insertMany([
  { _id: 101, name: "Modern Art", creator_id: 1 },
  { _id: 102, name: "Abstract Art", creator_id: 1 }
])
// NFTs (with metadata + ownership history)
db.NFTs.insertMany([
  {
    _id: 1001,
    title: "Digital Sunset",
    creator_id: 1,
    collection_id: 101,
    metadata: {
      resolution: "4K",
      format: "PNG",
      rarity: "Rare"
    },
    current_owner: 1,
    ownership_history: [
      { owner_id: 1, date: new Date("2026-04-01") }
    ]
  },
  {
    _id: 1002,
    title: "Abstract Waves",
    creator_id: 1,
    collection_id: 102,
    metadata: {
      resolution: "HD",
      format: "JPG",
      rarity: "Common"
    },
    current_owner: 2,
    ownership_history: [
      { owner_id: 1, date: new Date("2026-04-02") },
      { owner_id: 2, date: new Date("2026-04-05") }
    ]
  }
])
// Transactions
db.Transactions.insertMany([
  {
    _id: 5001,
    nft_id: 1002,
    seller_id: 1,
    buyer_id: 2,
    price: 200,
    type: "Direct Sale",
    date: new Date("2026-04-05")
  }
])
// Auctions
db.Auctions.insertMany([
  {
    _id: 7001,
    nft_id: 1001,
    starting_price: 100,
    current_bid: 150,
    highest_bidder: 3,
    status: "Ongoing",
    end_date: new Date("2026-05-01")
  }
])
// 3. Query
// Fetch complete ownership history of an NFT
db.NFTs.find(
  { _id: 1002 },
  { title: 1, ownership_history: 1, _id: 0 }
)
// 4. Updates
// (A) Transfer ownership after a sale
db.NFTs.updateOne(
  { _id: 1001 },
  {
    $set: { current_owner: 3 },
    $push: {
      ownership_history: {
        owner_id: 3,
        date: new Date()
      }
    }
  }
)
// (B) Update auction status (e.g., completed)
db.Auctions.updateOne(
  { _id: 7001 },
  {
    $set: {
      status: "Completed"
    }
  }
)
// 5. Aggregation Queries
// (A) Identify Top-Selling NFTs
db.Transactions.aggregate([
  {
    $group: {
      _id: "$nft_id",
      total_sales: { $sum: "$price" }
    }
  },
  {
    $sort: { total_sales: -1 }
  }
])
// (B) Calculate Total Sales Volume
db.Transactions.aggregate([
  {
    $group: {
      _id: null,
      total_volume: { $sum: "$price" }
    }
  }
])
// (C) Detect Most Active Traders
db.Transactions.aggregate([
  {
    $project: {
      users: ["$seller_id", "$buyer_id"]
    }
  },
  { $unwind: "$users" },
  {
    $group: {
      _id: "$users",
      transactions_count: { $sum: 1 }
    }
  },
  {
    $sort: { transactions_count: -1 }
  }
])