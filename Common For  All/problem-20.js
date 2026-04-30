//Question 1: Insert 5 bed documents using insertMany() with different bed types.
db.beds.insertMany([
  {
    bed_id: 1,
    ward_name: "ICU",
    bed_type: "ICU",
    is_occupied: true,
    patient_name: "Rohit Sharma",
    admission_date: new Date("2026-04-20"),
    expected_discharge_date: new Date("2026-04-24")
  },
  {
    bed_id: 2,
    ward_name: "ICU",
    bed_type: "ICU",
    is_occupied: false,
    patient_name: null,
    admission_date: null,
    expected_discharge_date: null
  },
  {
    bed_id: 3,
    ward_name: "General Ward",
    bed_type: "General",
    is_occupied: true,
    patient_name: "Priya Verma",
    admission_date: new Date("2026-04-22"),
    expected_discharge_date: new Date("2026-04-25")
  },
  {
    bed_id: 4,
    ward_name: "Private Wing",
    bed_type: "Private",
    is_occupied: false,
    patient_name: null,
    admission_date: null,
    expected_discharge_date: null
  },
  {
    bed_id: 5,
    ward_name: "General Ward",
    bed_type: "General",
    is_occupied: true,
    patient_name: "Ankit Das",
    admission_date: new Date("2026-04-26"),
    expected_discharge_date: new Date("2026-04-30")
  }
])

//Question 2: Find all beds where is_occupied is false AND ward_name is "ICU".
db.beds.find({
  $and: [
    { is_occupied: false },
    { ward_name: "ICU" }
  ]
})

//Question 3: Update the is_occupied to true and set patient_name for beds where admission_date is today.
db.beds.updateMany(
  {
    admission_date: {
      $gte: new Date("2026-04-26"),
      $lt: new Date("2026-04-27")
    }
  },
  {
    $set: {
      is_occupied: true,
      patient_name: "Ankit Das"
    }
  }
)

//Question 4: Delete all beds where expected_discharge_date is before today's date AND is_occupied is true.
db.beds.deleteMany({
  $and: [
    { expected_discharge_date: { $lt: new Date() } },
    { is_occupied: true }
  ]
})

//Question 5: Find all beds sorted by bed_type, displaying only ward_name, bed_type, and is_occupied.
db.beds.find(
  {},
  { ward_name: 1, bed_type: 1, is_occupied: 1, _id: 0 }
).sort({ bed_type: 1 })