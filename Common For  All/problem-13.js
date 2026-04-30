//Question 1: Insert 5 poll documents using insertMany() with different options arrays.
db.polls.insertMany([
  {
    poll_id: 1,
    question: "What is your favourite programming language?",
    options: ["Python", "Java", "JavaScript", "C++"],
    votes: [120, 85, 200, 60],
    created_date: new Date("2022-06-15"),
    end_date: new Date("2024-12-31"),
    is_active: false
  },
  {
    poll_id: 2,
    question: "Which database do you prefer for web apps?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "SQLite"],
    votes: [300, 150, 180, 90, 45],
    created_date: new Date("2024-03-01"),
    end_date: new Date("2026-03-01"),
    is_active: true
  },
  {
    poll_id: 3,
    question: "Do you prefer working from home?",
    options: ["Yes", "No"],
    votes: [450, 230],
    created_date: new Date("2022-11-10"),
    end_date: new Date("2023-11-10"),
    is_active: false
  },
  {
    poll_id: 4,
    question: "Which cloud platform do you use most?",
    options: ["AWS", "Azure", "Google Cloud", "IBM Cloud"],
    votes: [500, 320, 280, 100],
    created_date: new Date("2024-07-01"),
    end_date: new Date("2026-07-01"),
    is_active: true
  },
  {
    poll_id: 5,
    question: "What is your preferred frontend framework?",
    options: ["React", "Angular", "Vue", "Svelte", "Next.js"],
    votes: [600, 250, 180, 90, 120],
    created_date: new Date("2024-09-01"),
    end_date: new Date("2026-09-01"),
    is_active: true
  }
])

//Question 2: Find all polls where is_active is true AND end_date is after today's date.
db.polls.find({
  $and: [
    { is_active: true },
    { end_date: { $gt: new Date() } }
  ]
})

//Question 3: Update the is_active to false for all polls where end_date is before today's date.
db.polls.updateMany(
  { end_date: { $lt: new Date() } },
  { $set: { is_active: false } }
)

//Question 4: Delete all polls where created_date is before "2023-01-01" AND is_active is false.
db.polls.deleteMany({
  $and: [
    { created_date: { $lt: new Date("2023-01-01") } },
    { is_active: false }
  ]
})

//Question 5: Find all polls where the options array length is greater than 3 using $size operator.
db.polls.find({
  $or: [
    { options: { $size: 4 } },
    { options: { $size: 5 } }
  ]
})