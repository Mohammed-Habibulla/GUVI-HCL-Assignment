//Question 1: Create a giftcards collection and insert one gift card document.
db.giftcards.insertOne({
  card_id: 1,
  recipient_name: "Priya Sharma",
  sender_name: "Rohit Sharma",
  amount: 1000,
  purchase_date: new Date("2025-01-01"),
  expiry_date: new Date("2025-12-31"),
  is_used: false
})

//Question 2: Insert at least 5 gift card records using insertMany().
db.giftcards.insertMany([
  {
    card_id: 2,
    recipient_name: "Ankit Verma",
    sender_name: "Sneha Verma",
    amount: 500,
    purchase_date: new Date("2025-01-05"),
    expiry_date: new Date("2025-06-30"),
    is_used: false
  },
  {
    card_id: 3,
    recipient_name: "Divya Nair",
    sender_name: "Karan Nair",
    amount: 2000,
    purchase_date: new Date("2024-12-01"),
    expiry_date: new Date("2025-03-31"),
    is_used: true
  },
  {
    card_id: 4,
    recipient_name: "Arjun Das",
    sender_name: "Meena Das",
    amount: 1500,
    purchase_date: new Date("2024-11-15"),
    expiry_date: new Date("2025-02-28"),
    is_used: false
  },
  {
    card_id: 5,
    recipient_name: "Kavya Menon",
    sender_name: "Suresh Menon",
    amount: 750,
    purchase_date: new Date("2025-01-10"),
    expiry_date: new Date("2025-07-31"),
    is_used: true
  },
  {
    card_id: 6,
    recipient_name: "Rahul Gupta",
    sender_name: "Pooja Gupta",
    amount: 1200,
    purchase_date: new Date("2025-01-15"),
    expiry_date: new Date("2026-01-15"),
    is_used: false
  }
])

//Question 3: Retrieve all cards where is_used is false AND expiry_date is after today's date using find().
db.giftcards.find({
  $and: [
    { is_used: false },
    { expiry_date: { $gt: new Date() } }
  ]
})

//Question 4: Display only recipient_name, amount, and expiry_date using projection.
db.giftcards.find(
  {
    $and: [
      { is_used: false },
      { expiry_date: { $gt: new Date() } }
    ]
  },
  { recipient_name: 1, amount: 1, expiry_date: 1, _id: 0 }
)

//Question 5: Delete a gift card based on card_id.
db.giftcards.deleteOne({ card_id: 3 })