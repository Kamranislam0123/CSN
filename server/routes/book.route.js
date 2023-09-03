const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");
const {
  getBookById,
  createBook,
  allBooks,
  getBook,
  updateBook,
  deleteBook,
  likeBook,
  unlikeBook,
  commentBook,
} = require("../controllers/book.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("bookId", getBookById);

// create book
router.post("/create/book/:userId", isSignedIn, isAuthenticated, createBook);

// Like a book
router.put("/book/like/:userId/:bookId", isSignedIn, isAuthenticated, likeBook)

// Unlike a book
router.put(
  "/book/unlike/:userId/:bookId",
  isSignedIn,
  isAuthenticated,
  unlikeBook
)
// comment a book
router.put(
  "/book/comment/:userId/:bookId",
  isSignedIn,
  isAuthenticated,
  commentBook
)

// read all books
router.get("/books", isSignedIn, allBooks);

//read a particular book
router.get("/books/:bookId", isSignedIn, getBook);

// update book
router.put(
  "/update/book/:userId/:bookId",
  isSignedIn,
  isAuthenticated,
  updateBook
);

// delete book
router.delete(
  "/delete/book/:userId/:bookId",
  isSignedIn,
  isAuthenticated,
  deleteBook
);
module.exports = router;
