//Question 1: Insert 5 booking documents using insertMany() with different ticket types.
db.bookings.insertMany([
  {
    booking_id: 1,
    event_name: "Music Fest",
    event_date: new Date("2026-11-10"),
    venue: "Bangalore",
    customer_name: "Rahul",
    ticket_type: "VIP",
    number_of_tickets: 2,
    total_price: 5000,
    booking_date: new Date("2026-09-01"),
    payment_status: "Paid"
  },
  {
    booking_id: 2,
    event_name: "Tech Conference",
    event_date: new Date("2026-09-20"),
    venue: "Hyderabad",
    customer_name: "Amit",
    ticket_type: "General",
    number_of_tickets: 3,
    total_price: 3000,
    booking_date: new Date("2026-08-15"),
    payment_status: "Pending"
  },
  {
    booking_id: 3,
    event_name: "Art Expo",
    event_date: new Date("2026-12-05"),
    venue: "Delhi",
    customer_name: "Sneha",
    ticket_type: "Student",
    number_of_tickets: 1,
    total_price: 500,
    booking_date: new Date("2026-10-01"),
    payment_status: "Paid"
  },
  {
    booking_id: 4,
    event_name: "Music Fest",
    event_date: new Date("2026-08-01"),
    venue: "Mumbai",
    customer_name: "Karan",
    ticket_type: "General",
    number_of_tickets: 4,
    total_price: 4000,
    booking_date: new Date("2023-12-01"),
    payment_status: "Pending"
  },
  {
    booking_id: 5,
    event_name: "Tech Conference",
    event_date: new Date("2026-07-15"),
    venue: "Chennai",
    customer_name: "Priya",
    ticket_type: "VIP",
    number_of_tickets: 2,
    total_price: 6000,
    booking_date: new Date("2023-11-01"),
    payment_status: "Paid"
  }
])

//Question 2: Find all bookings where event_date is after "2026-10-01" AND payment_status is "Paid".
db.bookings.find({
  $and: [
    { event_date: { $gt: new Date("2026-10-01") } },
    { payment_status: "Paid" }
  ]
})

//Question 3: Update the payment_status to "Refunded" for all bookings where event_date is before today's date AND payment_status is "Paid".
db.bookings.updateMany(
  {
    $and: [
      { event_date: { $lt: new Date() } },
      { payment_status: "Paid" }
    ]
  },
  {
    $set: { payment_status: "Refunded" }
  }
)

//Question 4: Delete all bookings with payment_status "Pending" AND booking_date before "2024-01-01".
db.bookings.deleteMany({
  $and: [
    { payment_status: "Pending" },
    { booking_date: { $lt: new Date("2024-01-01") } }
  ]
})

//Question 5: Use aggregation to calculate the total number_of_tickets sold per event_name.
db.bookings.aggregate([
  {
    $group: {
      _id: "$event_name",
      total_tickets: { $sum: "$number_of_tickets" }
    }
  }
])