// Question 1: Create a menu collection and insert one menu item document.
db.menu.insertOne({
  item_id: 1,
  name: "Espresso",
  category: "Coffee",
  price: 120,
  availability: true
})

//Question 2: Insert at least 5 menu items using insertMany() with different categories.
db.menu.insertMany([
  {
    item_id: 2,
    name: "Cappuccino",
    category: "Coffee",
    price: 150,
    availability: true
  },
  {
    item_id: 3,
    name: "Masala Chai",
    category: "Tea",
    price: 80,
    availability: true
  },
  {
    item_id: 4,
    name: "Green Tea",
    category: "Tea",
    price: 90,
    availability: false
  },
  {
    item_id: 5,
    name: "Veg Sandwich",
    category: "Snack",
    price: 110,
    availability: true
  },
  {
    item_id: 6,
    name: "Brownie",
    category: "Snack",
    price: 130,
    availability: false
  }
])

//Question 3: Retrieve all items with availability true using find().
db.menu.find({ availability: true })

//Question 4: Display only name and price using projection.
db.menu.find(
  { availability: true },
  { name: 1, price: 1, _id: 0 }
)

//Question 5: Delete a menu item based on item_id.
db.menu.deleteOne({ item_id: 4 })