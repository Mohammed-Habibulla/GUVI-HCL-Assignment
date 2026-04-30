//Question 1: Insert 5 wishlist documents using insertMany() with different product categories.
db.wishlists.insertMany([
  {
    wishlist_id: 1,
    customer_name: "Rohit Sharma",
    product_name: "Sony Headphones",
    product_category: "Electronics",
    price: 3500,
    added_date: new Date("2023-10-15"),
    notify_when_available: true
  },
  {
    wishlist_id: 2,
    customer_name: "Priya Verma",
    product_name: "Running Shoes",
    product_category: "Sports",
    price: 1800,
    added_date: new Date("2024-03-22"),
    notify_when_available: true
  },
  {
    wishlist_id: 3,
    customer_name: "Rohit Sharma",
    product_name: "Smart Watch",
    product_category: "Electronics",
    price: 5000,
    added_date: new Date("2023-08-10"),
    notify_when_available: false
  },
  {
    wishlist_id: 4,
    customer_name: "Sneha Nair",
    product_name: "Cooking Pan Set",
    product_category: "Kitchen",
    price: 1200,
    added_date: new Date("2024-06-18"),
    notify_when_available: true
  },
  {
    wishlist_id: 5,
    customer_name: "Priya Verma",
    product_name: "Yoga Mat",
    product_category: "Sports",
    price: 800,
    added_date: new Date("2024-07-05"),
    notify_when_available: false
  }
])

//Question 2: Find all wishlist items where price is less than ₹2000 AND notify_when_available is true.
db.wishlists.find({
  $and: [
    { price: { $lt: 2000 } },
    { notify_when_available: true }
  ]
})

//Question 3: Update the price by applying a 20% discount for all products in "Electronics" category.

//— Apply discount to Sony Headphones:
db.wishlists.updateMany(
  {
    $and: [
      { product_category: "Electronics" },
      { product_name: "Sony Headphones" }
    ]
  },
  { $set: { price: 2800 } }
)

//— Apply discount to Smart Watch:
db.wishlists.updateMany(
  {
    $and: [
      { product_category: "Electronics" },
      { product_name: "Smart Watch" }
    ]
  },
  { $set: { price: 4000 } }
)

//Question 4: Delete all wishlist items where added_date is before "2024-01-01".
db.wishlists.deleteMany({
  added_date: { $lt: new Date("2024-01-01") }
})

//Question 5: Find all wishlist items grouped by customer_name and count how many items each customer has.
db.wishlists.aggregate([
  {
    $group: {
      _id: "$customer_name",
      total_items: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      customer_name: "$_id",
      total_items: 1
    }
  }
])