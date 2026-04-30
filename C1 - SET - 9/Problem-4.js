4. Renewable Energy Production & Grid Integration System
1. Collection Design
 EnergyPlants
{
  _id: ObjectId(),
  name: "Solar Plant A",
  type: "Solar", // Solar / Wind
  location_id: ObjectId(),
  capacity: 500, // kW
  status: "Active"
}
 Sensors
{
  _id: ObjectId(),
  plant_id: ObjectId(),
  sensor_type: "Production", // Production / Temperature / WindSpeed
  installation_date: ISODate()
}
 EnergyProduction (Time-Series)
{
  _id: ObjectId(),
  plant_id: ObjectId(),
  sensor_id: ObjectId(),
  timestamp: ISODate(),
  energy_generated: 120, // kWh
  efficiency: 85 // %
}
 GridData
{
  _id: ObjectId(),
  location_id: ObjectId(),
  timestamp: ISODate(),
  energy_supplied: 500,  // kWh
  energy_consumed: 450   // kWh
}
 Locations (Geospatial)
{
  _id: ObjectId(),
  name: "Bangalore Zone",
  coordinates: {
    type: "Point",
    coordinates: [77.5946, 12.9716]
  }
}
 2. Insert Sample Data
Insert Energy Production Logs
db.EnergyProduction.insertMany([
{
  plant_id: ObjectId("plant1"),
  sensor_id: ObjectId("sensor1"),
  timestamp: ISODate("2026-04-01T10:00:00Z"),
  energy_generated: 100,
  efficiency: 90
},
{
  plant_id: ObjectId("plant1"),
  sensor_id: ObjectId("sensor1"),
  timestamp: ISODate("2026-04-01T12:00:00Z"),
  energy_generated: 150,
  efficiency: 88
},
{
  plant_id: ObjectId("plant2"),
  sensor_id: ObjectId("sensor2"),
  timestamp: ISODate("2026-04-01T10:00:00Z"),
  energy_generated: 80,
  efficiency: 60
}
]);
 3. Query: Energy Production in Time Range
db.EnergyProduction.find({
  plant_id: ObjectId("plant1"),
  timestamp: {
    $gte: ISODate("2026-04-01T00:00:00Z"),
    $lte: ISODate("2026-04-02T00:00:00Z")
  }
});

 Explain:

Filters time-series data
Used for performance monitoring
 4. Update: Flag Underperforming Plants

 Condition: efficiency < 70%

db.EnergyProduction.find({
  efficiency: { $lt: 70 }
}).forEach(function(doc){
  db.EnergyPlants.updateOne(
    { _id: doc.plant_id },
    { $set: { status: "Underperforming" } }
  );
});
 5. Aggregation Queries
 (A) Total Energy per Location
db.EnergyProduction.aggregate([
  {
    $lookup: {
      from: "EnergyPlants",
      localField: "plant_id",
      foreignField: "_id",
      as: "plant"
    }
  },
  { $unwind: "$plant" },
  {
    $group: {
      _id: "$plant.location_id",
      total_energy: { $sum: "$energy_generated" }
    }
  }
]);
 (B) Peak Production Periods
db.EnergyProduction.aggregate([
  {
    $group: {
      _id: "$timestamp",
      total_energy: { $sum: "$energy_generated" }
    }
  },
  { $sort: { total_energy: -1 } },
  { $limit: 5 }
]);
 (C) Detect Inefficient Plants
db.EnergyProduction.aggregate([
  {
    $group: {
      _id: "$plant_id",
      avg_efficiency: { $avg: "$efficiency" }
    }
  },
  {
    $match: {
      avg_efficiency: { $lt: 70 }
    }
  }
]);