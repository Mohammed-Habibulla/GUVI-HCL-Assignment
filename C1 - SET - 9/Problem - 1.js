//problem-1. Smart Water Supply & Consumption Monitoring System
//1. Create Collections
//use water_management_system

db.createCollection("Consumers")
db.createCollection("Meters")
db.createCollection("Zones")
db.createCollection("WaterUsage")
db.createCollection("Alerts")
// 2. Insert Sample Data
// Zones
db.Zones.insertMany([
  { _id: 1, name: "Residential Area", location: "Zone A" },
  { _id: 2, name: "Commercial Area", location: "Zone B" },
  { _id: 3, name: "Industrial Area", location: "Zone C" }
])
// Consumers
db.Consumers.insertMany([
  { _id: 101, name: "Rahul Sharma", type: "Residential", zone_id: 1 },
  { _id: 102, name: "ABC Mall", type: "Commercial", zone_id: 2 },
  { _id: 103, name: "XYZ Factory", type: "Industrial", zone_id: 3 }
])
// Meters
db.Meters.insertMany([
  { _id: 201, consumer_id: 101, meter_number: "MTR001" },
  { _id: 202, consumer_id: 102, meter_number: "MTR002" },
  { _id: 203, consumer_id: 103, meter_number: "MTR003" }
])
// Water Usage (Time-Series Data)
db.WaterUsage.insertMany([
  {
    consumer_id: 101,
    meter_id: 201,
    date: new Date("2026-04-01"),
    consumption: 120,
    pressure: 30,
    leakage_flag: false
  },
  {
    consumer_id: 101,
    meter_id: 201,
    date: new Date("2026-04-05"),
    consumption: 300,
    pressure: 20,
    leakage_flag: true
  },
  {
    consumer_id: 102,
    meter_id: 202,
    date: new Date("2026-04-03"),
    consumption: 500,
    pressure: 40,
    leakage_flag: false
  },
  {
    consumer_id: 103,
    meter_id: 203,
    date: new Date("2026-04-02"),
    consumption: 900,
    pressure: 15,
    leakage_flag: true
  }
])
// 3. Query
// Water consumption for a specific consumer within date range
db.WaterUsage.find({
  consumer_id: 101,
  date: {
    $gte: new Date("2026-04-01"),
    $lte: new Date("2026-04-10")
  }
})
// 4. Update / Generate Alerts
// Condition:
//High consumption (> 250)
//OR leakage detected
db.WaterUsage.find().forEach(function(record) {
  if (record.consumption > 250 || record.leakage_flag === true) {
    db.Alerts.insertOne({
      consumer_id: record.consumer_id,
      meter_id: record.meter_id,
      date: record.date,
      message: "Abnormal usage or leakage detected",
      status: "Active"
    })
  }
})
// 5. Aggregation Queries
// (A) Average Consumption per Zone
db.WaterUsage.aggregate([
  {
    $lookup: {
      from: "Consumers",
      localField: "consumer_id",
      foreignField: "_id",
      as: "consumer"
    }
  },
  { $unwind: "$consumer" },
  {
    $group: {
      _id: "$consumer.zone_id",
      avg_consumption: { $avg: "$consumption" }
    }
  }
])
// (B) Identify High-Usage Areas
db.WaterUsage.aggregate([
  {
    $lookup: {
      from: "Consumers",
      localField: "consumer_id",
      foreignField: "_id",
      as: "consumer"
    }
  },
  { $unwind: "$consumer" },
  {
    $group: {
      _id: "$consumer.zone_id",
      total_consumption: { $sum: "$consumption" }
    }
  },
  {
    $sort: { total_consumption: -1 }
  }
])
// (C) Detect Possible Leakage Patterns
db.WaterUsage.aggregate([
  {
    $match: {
      $or: [
        { leakage_flag: true },
        { pressure: { $lt: 20 } }
      ]
    }
  },
  {
    $group: {
      _id: "$consumer_id",
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 }
    }
  }
])