//problem-3. Smart Classroom & Student Engagement System
//1. Create Collections
//use smart_classroom

db.createCollection("Students")
db.createCollection("Classes")
db.createCollection("Sessions")
db.createCollection("EngagementLogs")
db.createCollection("Assessments")
// 2. Insert Sample Data
// Students
db.Students.insertMany([
  { _id: 1, name: "Amit", class_ids: [101] },
  { _id: 2, name: "Neha", class_ids: [101] },
  { _id: 3, name: "Ravi", class_ids: [101] }
])
// Classes
db.Classes.insertMany([
  { _id: 101, name: "Data Science", teacher: "Dr. Sharma" }
])
// Sessions
db.Sessions.insertMany([
  { _id: 1001, class_id: 101, date: new Date("2026-04-01") },
  { _id: 1002, class_id: 101, date: new Date("2026-04-03") }
])
// Engagement Logs (Participation Data)
db.EngagementLogs.insertMany([
  {
    student_id: 1,
    class_id: 101,
    session_id: 1001,
    attendance: true,
    participation_score: 8,
    interaction_count: 5,
    quiz_score: 7
  },
  {
    student_id: 2,
    class_id: 101,
    session_id: 1001,
    attendance: true,
    participation_score: 9,
    interaction_count: 7,
    quiz_score: 8
  },
  {
    student_id: 3,
    class_id: 101,
    session_id: 1001,
    attendance: false,
    participation_score: 3,
    interaction_count: 1,
    quiz_score: 2
  },
  {
    student_id: 1,
    class_id: 101,
    session_id: 1002,
    attendance: true,
    participation_score: 7,
    interaction_count: 4,
    quiz_score: 6
  }
])
// Assessments
db.Assessments.insertMany([
  {
    _id: 2001,
    class_id: 101,
    title: "Quiz 1",
    max_score: 10
  }
])
// 3. Query
// Fetch engagement metrics of a student for a specific class
db.EngagementLogs.find({
  student_id: 1,
  class_id: 101
})
// 4. Update
// Record new engagement activity
db.EngagementLogs.insertOne({
  student_id: 2,
  class_id: 101,
  session_id: 1002,
  attendance: true,
  participation_score: 10,
  interaction_count: 8,
  quiz_score: 9
})
// 5. Aggregation Queries
// (A) Identify Most Engaged Students
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$student_id",
      total_participation: { $sum: "$participation_score" },
      total_interactions: { $sum: "$interaction_count" }
    }
  },
  {
    $addFields: {
      engagement_score: {
        $add: ["$total_participation", "$total_interactions"]
      }
    }
  },
  {
    $sort: { engagement_score: -1 }
  }
])
// (B) Calculate Average Class Participation
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$class_id",
      avg_participation: { $avg: "$participation_score" }
    }
  }
])
// (C) Detect Students at Risk (Low Engagement)

// Condition:

//Low participation (< 5)
//OR low quiz score (< 5)
//OR absent frequently
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$student_id",
      avg_participation: { $avg: "$participation_score" },
      avg_quiz: { $avg: "$quiz_score" },
      attendance_rate: {
        $avg: {
          $cond: [{ $eq: ["$attendance", true] }, 1, 0]
        }
      }
    }
  },
  {
    $match: {
      $or: [
        { avg_participation: { $lt: 5 } },
        { avg_quiz: { $lt: 5 } },
        { attendance_rate: { $lt: 0.5 } }
      ]
    }
  }
])