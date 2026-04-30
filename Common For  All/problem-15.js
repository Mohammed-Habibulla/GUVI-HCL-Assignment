//Question 1: Insert 5 reading records using insertMany() with different genres.
db.readings.insertMany([
  {
    record_id: 1,
    member_name: "Rohit Sharma",
    book_title: "The Alchemist",
    genre: "Fiction",
    pages_read: 208,
    total_pages: 208,
    start_date: new Date("2024-01-05"),
    completion_date: new Date("2024-01-20"),
    is_completed: true
  },
  {
    record_id: 2,
    member_name: "Priya Verma",
    book_title: "Sapiens",
    genre: "Non-Fiction",
    pages_read: 150,
    total_pages: 443,
    start_date: new Date("2022-11-10"),
    completion_date: null,
    is_completed: false
  },
  {
    record_id: 3,
    member_name: "Ankit Das",
    book_title: "Harry Potter and the Sorcerer Stone",
    genre: "Fiction",
    pages_read: 309,
    total_pages: 309,
    start_date: new Date("2024-03-01"),
    completion_date: new Date("2024-03-25"),
    is_completed: true
  },
  {
    record_id: 4,
    member_name: "Sneha Nair",
    book_title: "Atomic Habits",
    genre: "Self-Help",
    pages_read: 80,
    total_pages: 320,
    start_date: new Date("2022-08-15"),
    completion_date: null,
    is_completed: false
  },
  {
    record_id: 5,
    member_name: "Kavya Menon",
    book_title: "The Great Gatsby",
    genre: "Fiction",
    pages_read: 120,
    total_pages: 180,
    start_date: new Date("2024-05-10"),
    completion_date: null,
    is_completed: false
  }
])

//Question 2: Find all records where is_completed is false AND pages_read is greater than 100.
db.readings.find({
  $and: [
    { is_completed: false },
    { pages_read: { $gt: 100 } }
  ]
})

//Question 3: Update the is_completed to true for all records where completion_date is not null.
db.readings.updateMany(
  { completion_date: { $ne: null } },
  { $set: { is_completed: true } }
)

//Question 4: Delete all records where start_date is before "2023-01-01" AND is_completed is false.
db.readings.deleteMany({
  $and: [
    { start_date: { $lt: new Date("2023-01-01") } },
    { is_completed: false }
  ]
})

//Question 5: Find all records where genre is "Fiction" AND is_completed is true.
db.readings.find({
  $and: [
    { genre: "Fiction" },
    { is_completed: true }
  ]
})