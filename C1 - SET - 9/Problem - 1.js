1. Smart Water Supply & Consumption Monitoring System
1. Collection Design
 Consumers
{
  _id: ObjectId(),
  name: "Rahul Sharma",
  type: "Residential", // Residential / Commercial / Industrial
  zone_id: ObjectId(),
  address: "Bangalore"
}
 Meters
{
  _id: ObjectId(),
  consumer_id: ObjectId(),
  installation_date: ISODate("2025-01-10"),
  status: "Active"
}
 WaterUsage (Time-Series Data)
{
  _id: ObjectId(),
  meter_id: ObjectId(),
  timestamp: ISODate("2026-04-01T10:00:00Z"),
  consumption: 120,   // liters
  pressure: 50,       // PSI
  leakage_flag: false
}
 Zones
{
  _id: ObjectId(),
  zone_name: "Zone A",
  region: "North",
  coordinates: {
    type: "Point",
    coordinates: [77.5946, 12.9716] // longitude, latitude
  }
}
 Alerts
{
  _id: ObjectId(),
  meter_id: ObjectId(),
  alert_type: "Leakage" || "High Usage",
  message: "Possible leakage detected",
  timestamp: ISODate(),
  status: "Active"
}

2. Insert Sample Data
Insert Consumer
db.Consumers.insertOne({
  name: "Rahul Sharma",
  type: "Residential",
  zone_id: ObjectId("zone1"),
  address: "Bangalore"
});
Insert Meter
db.Meters.insertOne({
  consumer_id: ObjectId("consumer1"),
  installation_date: new Date(),
  status: "Active"
});
Insert Water Usage (Multiple Records)
db.WaterUsage.insertMany([
{
  meter_id: ObjectId("meter1"),
  timestamp: ISODate("2026-04-01T08:00:00Z"),
  consumption: 100,
  pressure: 55,
  leakage_flag: false
},
{
  meter_id: ObjectId("meter1"),
  timestamp: ISODate("2026-04-02T08:00:00Z"),
  consumption: 300,
  pressure: 30,
  leakage_flag: true
}
]);
 3. Query: Consumption in Date Range
db.WaterUsage.find({
  meter_id: ObjectId("meter1"),
  timestamp: {
    $gte: ISODate("2026-04-01T00:00:00Z"),
    $lte: ISODate("2026-04-05T00:00:00Z")
  }
});

 Explain like this:

$gte = start date
$lte = end date
Filters time-series data
 4. Update: Generate Alerts
 High Usage Alert
db.WaterUsage.find({
  consumption: { $gt: 250 }
}).forEach(function(doc){
  db.Alerts.insertOne({
    meter_id: doc.meter_id,
    alert_type: "High Usage",
    message: "Abnormal water usage detected",
    timestamp: new Date(),
    status: "Active"
  });
});
 Leakage Alert
db.WaterUsage.find({
  leakage_flag: true
}).forEach(function(doc){
  db.Alerts.insertOne({
    meter_id: doc.meter_id,
    alert_type: "Leakage",
    message: "Leakage detected",
    timestamp: new Date(),
    status: "Active"
  });
});
 5. Aggregation Queries
 (A) Average Consumption per Zone
db.WaterUsage.aggregate([
  {
    $lookup: {
      from: "Meters",
      localField: "meter_id",
      foreignField: "_id",
      as: "meter"
    }
  },
  { $unwind: "$meter" },
  {
    $lookup: {
      from: "Consumers",
      localField: "meter.consumer_id",
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
]);
 (B) Identify High-Usage Areas
db.WaterUsage.aggregate([
  {
    $group: {
      _id: "$meter_id",
      total_usage: { $sum: "$consumption" }
    }
  },
  {
    $match: {
      total_usage: { $gt: 500 }
    }
  }
]);
 (C) Detect Leakage Patterns
db.WaterUsage.aggregate([
  {
    $match: { leakage_flag: true }
  },
  {
    $group: {
      _id: "$meter_id",
      leakage_count: { $sum: 1 }
    }
  },
  {
    $match: {
      leakage_count: { $gt: 2 }
    }
  }
]);