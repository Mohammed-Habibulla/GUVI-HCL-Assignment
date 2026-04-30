//Question 1: Insert 5 product documents using insertMany() with different categories.
db.inventory.insertMany([
  {
    product_id: 1,
    product_name: "Industrial Drill Bits",
    category: "Tools",
    quantity_in_stock: 15,
    reorder_level: 20,
    supplier_name: "ABC Corp",
    last_restock_date: new Date("2021-08-10"),
    storage_location: "Shelf A1"
  },
  {
    product_id: 2,
    product_name: "Safety Helmets",
    category: "Safety Equipment",
    quantity_in_stock: 80,
    reorder_level: 50,
    supplier_name: "SafeGuard Ltd",
    last_restock_date: new Date("2024-03-15"),
    storage_location: "Shelf B2"
  },
  {
    product_id: 3,
    product_name: "Packing Tape Rolls",
    category: "Packaging",
    quantity_in_stock: 0,
    reorder_level: 30,
    supplier_name: "ABC Corp",
    last_restock_date: new Date("2021-05-20"),
    storage_location: "Shelf C3"
  },
  {
    product_id: 4,
    product_name: "Hydraulic Jack",
    category: "Tools",
    quantity_in_stock: 10,
    reorder_level: 25,
    supplier_name: "MechSupply Inc",
    last_restock_date: new Date("2024-07-01"),
    storage_location: "Shelf D4"
  },
  {
    product_id: 5,
    product_name: "Bubble Wrap Rolls",
    category: "Packaging",
    quantity_in_stock: 200,
    reorder_level: 100,
    supplier_name: "PackPro Ltd",
    last_restock_date: new Date("2024-09-10"),
    storage_location: "Shelf E5"
  }
])

//Question 2: Find all products where quantity_in_stock is less than reorder_level.
db.inventory.find({
  $expr: { $lt: ["$quantity_in_stock", "$reorder_level"] }
})

//Question 3: Update the quantity_in_stock by adding 100 to all products from supplier "ABC Corp".
db.inventory.find(
  { supplier_name: "ABC Corp" },
  { product_name: 1, quantity_in_stock: 1, _id: 0 }
)

//Question 4: Delete all products where last_restock_date is before "2022-01-01" AND quantity_in_stock is 0.
db.inventory.updateMany(
  {
    $and: [
      { supplier_name: "ABC Corp" },
      { product_name: "Packing Tape Rolls" }
    ]
  },
  { $set: { quantity_in_stock: 100 } }
)

//Question 5: Create an index on category and quantity_in_stock to optimize inventory queries.
//Step 1 — Create a Single Field Index on category:
db.inventory.createIndex({ category: 1 })
//Step 2 — Create a Compound Index on category and quantity_in_stock:
db.inventory.createIndex({ category: 1, quantity_in_stock: 1 })
//Step 3 — Verify indexes were created:
db.inventory.getIndexes()
//Step 4 — Analyze query performance using explain() to verify index is being used:
db.inventory.find(
  { category: "Tools", quantity_in_stock: { $lt: 50 } }
).explain("executionStats")