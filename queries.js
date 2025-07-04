// queries.js 
// 🔹 Task 2: Basic CRUD Operations
// ==============================

// Find all books in a specific genre
db.books.find({ genre: "Fantasy" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// 🔹 Task 3: Advanced Queries

// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: only show title, author, price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })

// Sort books by price ascending
db.books.find().sort({ price: 1 })

// Sort books by price descending
db.books.find().sort({ price: -1 })

// Pagination: page 1 (books 1–5)
db.books.find().limit(5).skip(0)

// Pagination: page 2 (books 6–10)
db.books.find().limit(5).skip(5)


// 🔹 Task 4: Aggregation Pipelines

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// 🔹 Task 5: Indexing
// Create an index on the title
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Analyze performance with explain()
db.books.find({ title: "The Hobbit" }).explain("executionStats")
