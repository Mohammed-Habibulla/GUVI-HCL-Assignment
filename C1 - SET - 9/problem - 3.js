3. Smart Classroom & Student Engagement System
1. Collection Design
 Students
{
  _id: ObjectId(),
  name: "Rahul",
  email: "rahul@email.com",
  enrolled_classes: [ObjectId("class1")]
}
 Classes
{
  _id: ObjectId(),
  class_name: "Data Science",
  teacher: "Dr. Sharma",
  students: [ObjectId("student1"), ObjectId("student2")]
}
 Sessions (Each Lecture)
{
  _id: ObjectId(),
  class_id: ObjectId(),
  topic: "Regression",
  date: ISODate("2026-04-01")
}
 EngagementLogs (Main Tracking Collection)
{
  _id: ObjectId(),
  student_id: ObjectId(),
  class_id: ObjectId(),
  session_id: ObjectId(),
  attendance: true,
  participation_score: 8,  // out of 10
  interaction_count: 5,    // questions asked
  timestamp: ISODate()
}
 Assessments (Quiz / Tests)
{
  _id: ObjectId(),
  student_id: ObjectId(),
  class_id: ObjectId(),
  session_id: ObjectId(),
  quiz_score: 85,
  max_score: 100,
  timestamp: ISODate()
}
 2. Insert Sample Data
Insert Engagement Data
db.EngagementLogs.insertMany([
{
  student_id: ObjectId("student1"),
  class_id: ObjectId("class1"),
  session_id: ObjectId("session1"),
  attendance: true,
  participation_score: 7,
  interaction_count: 4,
  timestamp: new Date()
},
{
  student_id: ObjectId("student1"),
  class_id: ObjectId("class1"),
  session_id: ObjectId("session2"),
  attendance: true,
  participation_score: 9,
  interaction_count: 6,
  timestamp: new Date()
}
]);
 3. Query: Student Engagement for Specific Class
db.EngagementLogs.find({
  student_id: ObjectId("student1"),
  class_id: ObjectId("class1")
});

 Explain:

Filters engagement logs by student + class
Shows full activity across sessions
 4. Update: Record New Engagement Activity
 Add New Engagement Record
db.EngagementLogs.insertOne({
  student_id: ObjectId("student1"),
  class_id: ObjectId("class1"),
  session_id: ObjectId("session3"),
  attendance: true,
  participation_score: 8,
  interaction_count: 5,
  timestamp: new Date()
});
 Add Quiz Score
db.Assessments.insertOne({
  student_id: ObjectId("student1"),
  class_id: ObjectId("class1"),
  session_id: ObjectId("session3"),
  quiz_score: 90,
  max_score: 100,
  timestamp: new Date()
});
 5. Aggregation Queries
 (A) Most Engaged Students
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$student_id",
      avg_participation: { $avg: "$participation_score" },
      total_interactions: { $sum: "$interaction_count" }
    }
  },
  { $sort: { avg_participation: -1 } },
  { $limit: 5 }
]);
 (B) Average Class Participation
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$class_id",
      avg_participation: { $avg: "$participation_score" }
    }
  }
]);
 (C) Detect Students at Risk (Low Engagement)
db.EngagementLogs.aggregate([
  {
    $group: {
      _id: "$student_id",
      avg_participation: { $avg: "$participation_score" }
    }
  },
  {
    $match: {
      avg_participation: { $lt: 5 }
    }
  }
]);