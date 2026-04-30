//Question 1: Create a hostel collection and insert one student document.
db.hostel.insertOne({
  student_id: 1,
  name: "Rohit Sharma",
  room_number: 101,
  block_name: "A",
  bed_number: 1,
  check_in_date: new Date("2025-01-05")
})

//QUestion 2: Insert at least 5 student records using insertMany() with different room numbers.
db.hostel.insertMany([
  {
    student_id: 2,
    name: "Ankit Verma",
    room_number: 102,
    block_name: "A",
    bed_number: 2,
    check_in_date: new Date("2025-01-06")
  },
  {
    student_id: 3,
    name: "Sneha Patil",
    room_number: 201,
    block_name: "B",
    bed_number: 1,
    check_in_date: new Date("2025-01-07")
  },
  {
    student_id: 4,
    name: "Karan Mehta",
    room_number: 103,
    block_name: "A",
    bed_number: 3,
    check_in_date: new Date("2025-01-08")
  },
  {
    student_id: 5,
    name: "Divya Nair",
    room_number: 202,
    block_name: "B",
    bed_number: 2,
    check_in_date: new Date("2025-01-09")
  },
  {
    student_id: 6,
    name: "Arjun Das",
    room_number: 301,
    block_name: "C",
    bed_number: 1,
    check_in_date: new Date("2025-01-10")
  }
])

//Question 3: Retrieve all students from block "A" using find().
db.hostel.find({ block_name: "A" })

//Question 4: Display only name, room_number, and block_name using projection.
db.hostel.find(
  { block_name: "A" },
  { name: 1, room_number: 1, block_name: 1, _id: 0 }
)

//Question 5: Delete a student record based on student_id.
db.hostel.deleteOne({ student_id: 6 })