//Question 1: Insert 5 ride documents using insertMany() with different ride statuses.
db.rides.insertMany([
  {
    ride_id: 1,
    rider_name: "Rohit Sharma",
    driver_name: "Ramesh Kumar",
    pickup_location: "Andheri Station",
    drop_location: "Bandra West",
    ride_date: new Date("2024-05-10"),
    distance_km: 8.5,
    fare: 220,
    ride_status: "Cancelled"
  },
  {
    ride_id: 2,
    rider_name: "Priya Verma",
    driver_name: "Suresh Patel",
    pickup_location: "Powai Lake",
    drop_location: "Kurla Station",
    ride_date: new Date("2026-04-26"),
    distance_km: 12.3,
    fare: 380,
    ride_status: "Requested"
  },
  {
    ride_id: 3,
    rider_name: "Ankit Das",
    driver_name: "Mahesh Singh",
    pickup_location: "Dadar Circle",
    drop_location: "Colaba Causeway",
    ride_date: new Date("2024-03-15"),
    distance_km: 15.7,
    fare: 450,
    ride_status: "Cancelled"
  },
  {
    ride_id: 4,
    rider_name: "Sneha Nair",
    driver_name: "Vikram Yadav",
    pickup_location: "Malad West",
    drop_location: "Goregaon East",
    ride_date: new Date("2026-04-26"),
    distance_km: 5.2,
    fare: 150,
    ride_status: "Accepted"
  },
  {
    ride_id: 5,
    rider_name: "Kavya Menon",
    driver_name: "Dinesh Verma",
    pickup_location: "Borivali Station",
    drop_location: "Kandivali Mall",
    ride_date: new Date("2026-04-20"),
    distance_km: 18.0,
    fare: 520,
    ride_status: "Completed"
  }
])

//Question 2: Find all rides with ride_status "Requested" AND ride_date is today.
db.rides.find({
  $and: [
    { ride_status: "Requested" },
    {
      ride_date: {
        $gte: new Date("2026-04-26"),
        $lt: new Date("2026-04-27")
      }
    }
  ]
})

//Question 3: Update the ride_status to "Completed" for all rides where drop_location is not null.
db.rides.updateMany(
  { drop_location: { $ne: null } },
  { $set: { ride_status: "Completed" } }
)

//Question 4: Delete all rides with ride_status "Cancelled" AND ride_date before "2024-06-01".
db.rides.deleteMany({
  $and: [
    { ride_status: "Cancelled" },
    { ride_date: { $lt: new Date("2024-06-01") } }
  ]
})

//Question 5: Find all rides where distance_km is greater than 10 AND fare is greater than ₹300.
db.rides.find({
  $and: [
    { distance_km: { $gt: 10 } },
    { fare: { $gt: 300 } }
  ]
})