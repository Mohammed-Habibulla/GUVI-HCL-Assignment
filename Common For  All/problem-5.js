//Question 1: Create a watchlist collection and insert one movie document.
db.watchlist.insertOne({
  movie_id: 1,
  title: "Interstellar",
  genre: "Science Fiction",
  release_year: 2014,
  imdb_rating: 8.6,
  watched: true
})

//Question 2: Insert at least 5 movie records using insertMany() with different genres.
db.watchlist.insertMany([
  {
    movie_id: 2,
    title: "The Dark Knight",
    genre: "Action",
    release_year: 2008,
    imdb_rating: 9.0,
    watched: false
  },
  {
    movie_id: 3,
    title: "Parasite",
    genre: "Thriller",
    release_year: 2019,
    imdb_rating: 8.5,
    watched: false
  },
  {
    movie_id: 4,
    title: "Forrest Gump",
    genre: "Drama",
    release_year: 1994,
    imdb_rating: 8.8,
    watched: true
  },
  {
    movie_id: 5,
    title: "The Lion King",
    genre: "Animation",
    release_year: 1994,
    imdb_rating: 8.5,
    watched: false
  },
  {
    movie_id: 6,
    title: "Tumbbad",
    genre: "Horror",
    release_year: 2018,
    imdb_rating: 8.2,
    watched: false
  }
])

//Question 3: Retrieve all movies where watched is false using find().
db.watchlist.find({ watched: false })

//Question 4: Display only title, genre, and imdb_rating using projection.
db.watchlist.find(
  { watched: false },
  { title: 1, genre: 1, imdb_rating: 1, _id: 0 }
)

//Question 5: Delete a movie based on movie_id.
db.watchlist.deleteOne({ movie_id: 5 })