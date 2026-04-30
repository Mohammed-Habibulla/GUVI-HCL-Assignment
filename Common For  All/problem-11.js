//Question 1: Insert 5 subscription documents using insertMany() with different plan types.
db.subscriptions.insertMany([
  {
    sub_id: 1,
    user_name: "Rohit Sharma",
    plan_type: "Basic",
    monthly_fee: 199,
    start_date: new Date("2024-06-01"),
    renewal_date: new Date("2024-12-01"),
    is_active: false
  },
  {
    sub_id: 2,
    user_name: "Priya Verma",
    plan_type: "Premium",
    monthly_fee: 649,
    start_date: new Date("2024-08-01"),
    renewal_date: new Date("2025-08-01"),
    is_active: true
  },
  {
    sub_id: 3,
    user_name: "Ankit Das",
    plan_type: "Standard",
    monthly_fee: 399,
    start_date: new Date("2024-09-01"),
    renewal_date: new Date("2025-09-01"),
    is_active: true
  },
  {
    sub_id: 4,
    user_name: "Sneha Nair",
    plan_type: "Basic",
    monthly_fee: 199,
    start_date: new Date("2024-05-01"),
    renewal_date: new Date("2024-11-01"),
    is_active: false
  },
  {
    sub_id: 5,
    user_name: "Kavya Menon",
    plan_type: "Premium",
    monthly_fee: 649,
    start_date: new Date("2024-10-01"),
    renewal_date: new Date("2025-10-01"),
    is_active: true
  }
])

//Question 2: Find all subscriptions with is_active true AND plan_type "Premium".
db.subscriptions.find({
  $and: [
    { is_active: true },
    { plan_type: "Premium" }
  ]
})

//Question 3: Update the monthly_fee by increasing it by ₹100 for all Basic plan subscriptions.
db.subscriptions.updateMany(
  { plan_type: "Basic" },
  { $inc: { monthly_fee: 100 } }
)

//Question 4: Delete all subscriptions where is_active is false AND renewal_date is before "2025-01-01".
db.subscriptions.deleteMany({
  $and: [
    { is_active: false },
    { renewal_date: { $lt: new Date("2025-01-01") } }
  ]
})

//Question 5: Find all subscriptions sorted by monthly_fee in descending order, displaying only user_name, plan_type, and monthly_fee.
db.subscriptions.find(
  {},
  { user_name: 1, plan_type: 1, monthly_fee: 1, _id: 0 }
).sort({ monthly_fee: -1 })