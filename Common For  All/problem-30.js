//Question 1: Insert 5 defect records using insertMany() with different severity levels.
db.defects.insertMany([
  {
    defect_id: 1,
    product_name: "Laptop",
    batch_number: "B101",
    defect_type: "Functional",
    detection_date: new Date("2024-05-10"),
    severity: "High",
    quantity_affected: 10,
    root_cause: "Circuit Failure",
    status: "Open",
    resolution_date: null
  },
  {
    defect_id: 2,
    product_name: "Mobile",
    batch_number: "B102",
    defect_type: "Cosmetic",
    detection_date: new Date("2023-03-12"),
    severity: "Low",
    quantity_affected: 5,
    root_cause: "Scratch Issue",
    status: "Resolved",
    resolution_date: new Date("2023-04-01")
  },
  {
    defect_id: 3,
    product_name: "Tablet",
    batch_number: "B103",
    defect_type: "Safety",
    detection_date: new Date("2025-01-20"),
    severity: "High",
    quantity_affected: 8,
    root_cause: "Battery Overheating",
    status: "Open",
    resolution_date: null
  },
  {
    defect_id: 4,
    product_name: "Laptop",
    batch_number: "B104",
    defect_type: "Functional",
    detection_date: new Date("2021-12-01"),
    severity: "Medium",
    quantity_affected: 6,
    root_cause: "Software Bug",
    status: "Resolved",
    resolution_date: new Date("2022-01-15")
  },
  {
    defect_id: 5,
    product_name: "Mobile",
    batch_number: "B105",
    defect_type: "Cosmetic",
    detection_date: new Date("2024-08-22"),
    severity: "Medium",
    quantity_affected: 7,
    root_cause: "Paint Issue",
    status: "Investigating",
    resolution_date: null
  }
])

//Question 2: Find all defects where severity is "High" AND status is "Open".
db.defects.find({
  $and: [
    { severity: "High" },
    { status: "Open" }
  ]
})

//Question 3: Update the status to "Resolved" and set resolution_date to today for all defects where root_cause is identified.
db.defects.updateMany(
  {
    root_cause: { $ne: null }
  },
  {
    $set: {
      status: "Resolved",
      resolution_date: new Date()
    }
  }
)

//Question 4: Delete all defects where detection_date is before "2022-01-01" AND status is "Resolved".
db.defects.deleteMany({
  $and: [
    { detection_date: { $lt: new Date("2022-01-01") } },
    { status: "Resolved" }
  ]
})

//Question 5: Use aggregation to calculate the total quantity_affected per defect_type, sorted from highest to lowest.
db.defects.aggregate([
  {
    $group: {
      _id: "$defect_type",
      total_quantity: { $sum: "$quantity_affected" }
    }
  },
  { $sort: { total_quantity: -1 } }
])
