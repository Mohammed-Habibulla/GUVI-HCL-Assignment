//problem-4. Renewable Energy Production & Grid Integration System
//1. Create Collections
//use renewable_energy_system

db.createCollection("EnergyPlants")
db.createCollection("Sensors")
db.createCollection("EnergyProduction")
db.createCollection("GridData")
db.createCollection("Locations")
// 2. Insert Sample Data
// Locations
db.Locations.insertMany([
  { _id: 1, name: "Bangalore", region: "South" },
  { _id: 2, name: "Mumbai", region: "West" }
])
// Energy Plants
db.EnergyPlants.insertMany([
  {
    _id: 101,
    name: "Solar Plant A",
    type: "Solar",
    location_id: 1,
    capacity: 1000, // kW
    status: "Active"
  },
  {
    _id: 102,
    name: "Wind Plant B",
    type: "Wind",
    location_id: 2,
    capacity: 1500,
    status: "Active"
  }
])
// Sensors
db.Sensors.insertMany([
  { _id: 201, plant_id: 101, sensor_type: "Solar Panel Sensor" },
  { _id: 202, plant_id: 102, sensor_type: "Wind Turbine Sensor" }
])
// Energy Production (Time-Series)
db.EnergyProduction.insertMany([
  {
    plant_id: 101,
    sensor_id: 201,
    timestamp: new Date("2026-04-01T10:00:00"),
    energy_output: 500
  },
  {
    plant_id: 101,
    sensor_id: 201,
    timestamp: new Date("2026-04-01T14:00:00"),
    energy_output: 800
  },
  {
    plant_id: 102,
    sensor_id: 202,
    timestamp: new Date("2026-04-01T10:00:00"),
    energy_output: 700
  },
  {
    plant_id: 102,
    sensor_id: 202,
    timestamp: new Date("2026-04-01T14:00:00"),
    energy_output: 1200
  }
])
// Grid Data
db.GridData.insertMany([
  {
    location_id: 1,
    timestamp: new Date("2026-04-01T10:00:00"),
    supply: 500,
    demand: 450
  },
  {
    location_id: 2,
    timestamp: new Date("2026-04-01T14:00:00"),
    supply: 1200,
    demand: 1300
  }
])
// 3. Query
// Retrieve energy production data for a plant within a time range
db.EnergyProduction.find({
  plant_id: 101,
  timestamp: {
    $gte: new Date("2026-04-01T00:00:00"),
    $lte: new Date("2026-04-02T00:00:00")
  }
})
// 4. Update
// Flag underperforming plants

// Condition:

//Output < 50% of capacity
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
    $match: {
      $expr: {
        $lt: ["$energy_output", { $multiply: ["$plant.capacity", 0.5] }]
      }
    }
  }
]).forEach(function(record) {
  db.EnergyPlants.updateOne(
    { _id: record.plant_id },
    { $set: { status: "Underperforming" } }
  )
})
// 5. Aggregation Queries
// (A) Total Energy Produced per Location
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
      total_energy: { $sum: "$energy_output" }
    }
  }
])
// (B) Identify Peak Production Periods
db.EnergyProduction.aggregate([
  {
    $group: {
      _id: "$timestamp",
      total_output: { $sum: "$energy_output" }
    }
  },
  {
    $sort: { total_output: -1 }
  },
  {
    $limit: 3
  }
])
// (C) Detect Inefficient Plants

// Condition:

//Average production < 60% of capacity
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
      _id: "$plant_id",
      avg_output: { $avg: "$energy_output" },
      capacity: { $first: "$plant.capacity" }
    }
  },
  {
    $match: {
      $expr: {
        $lt: ["$avg_output", { $multiply: ["$capacity", 0.6] }]
      }
    }
  }
])