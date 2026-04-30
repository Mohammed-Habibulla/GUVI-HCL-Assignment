//Question 1: Create a workouts collection and insert one workout document.
db.workouts.insertOne({
  workout_id: 1,
  exercise_name: "Running",
  duration_minutes: 45,
  calories_burned: 420,
  date: new Date("2025-01-05"),
  intensity: "High"
})

//Question 2: Insert at least 5 workout records using insertMany().
db.workouts.insertMany([
  {
    workout_id: 2,
    exercise_name: "Yoga",
    duration_minutes: 30,
    calories_burned: 120,
    date: new Date("2025-01-06"),
    intensity: "Low"
  },
  {
    workout_id: 3,
    exercise_name: "Cycling",
    duration_minutes: 60,
    calories_burned: 500,
    date: new Date("2025-01-07"),
    intensity: "High"
  },
  {
    workout_id: 4,
    exercise_name: "Swimming",
    duration_minutes: 40,
    calories_burned: 350,
    date: new Date("2025-01-08"),
    intensity: "Medium"
  },
  {
    workout_id: 5,
    exercise_name: "Jump Rope",
    duration_minutes: 20,
    calories_burned: 200,
    date: new Date("2025-01-09"),
    intensity: "High"
  },
  {
    workout_id: 6,
    exercise_name: "Walking",
    duration_minutes: 50,
    calories_burned: 180,
    date: new Date("2025-01-10"),
    intensity: "Low"
  }
])

//Question 3: Retrieve all workouts with intensity "High" using find().
db.workouts.find({ intensity: "High" })

//Question 4: Display only exercise_name, duration_minutes, and calories_burned using projection.
db.workouts.find(
  { intensity: "High" },
  { exercise_name: 1, duration_minutes: 1, calories_burned: 1, _id: 0 }
)

//Question 5: Delete a workout based on workout_id.
db.workouts.deleteOne({ workout_id: 6 })