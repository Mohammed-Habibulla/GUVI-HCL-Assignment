//Question 1: Create a parcels collection and insert one parcel document.
db.parcels.insertOne({
  parcel_id: 1,
  sender_name: "Rohit Sharma",
  receiver_name: "Ankit Verma",
  weight: 2.5,
  shipping_cost: 150,
  booking_date: new Date("2025-01-05"),
  delivery_status: "Pending"
})

//Question 2: Insert at least 5 parcel records using insertMany().
db.parcels.insertMany([
  {
    parcel_id: 2,
    sender_name: "Sneha Patil",
    receiver_name: "Divya Nair",
    weight: 1.2,
    shipping_cost: 80,
    booking_date: new Date("2025-01-06"),
    delivery_status: "Shipped"
  },
  {
    parcel_id: 3,
    sender_name: "Karan Mehta",
    receiver_name: "Arjun Das",
    weight: 5.0,
    shipping_cost: 300,
    booking_date: new Date("2025-01-07"),
    delivery_status: "Delivered"
  },
  {
    parcel_id: 4,
    sender_name: "Kavya Menon",
    receiver_name: "Rahul Gupta",
    weight: 0.8,
    shipping_cost: 60,
    booking_date: new Date("2025-01-08"),
    delivery_status: "Pending"
  },
  {
    parcel_id: 5,
    sender_name: "Vikram Singh",
    receiver_name: "Pooja Iyer",
    weight: 3.5,
    shipping_cost: 220,
    booking_date: new Date("2025-01-09"),
    delivery_status: "Pending"
  },
  {
    parcel_id: 6,
    sender_name: "Meena Das",
    receiver_name: "Suresh Kumar",
    weight: 2.0,
    shipping_cost: 130,
    booking_date: new Date("2025-01-10"),
    delivery_status: "Shipped"
  }
])

//Question 3: Retrieve all parcels with delivery_status "Pending" using find().
db.parcels.find({ delivery_status: "Pending" })

//Question 4: Display only sender_name, receiver_name, and shipping_cost using projection.
db.parcels.find(
  { delivery_status: "Pending" },
  { sender_name: 1, receiver_name: 1, shipping_cost: 1, _id: 0 }
)

//Question 5: Delete a parcel based on parcel_id.
db.parcels.deleteOne({ parcel_id: 3 })