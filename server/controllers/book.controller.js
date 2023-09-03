const Book = require("../models/Books");
const path = require("path");

exports.getBookById = (req, res, next, Id) => {
  Book.findById(Id).exec((err, book) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    if (!book) {
      return res.status(400).json({
        errorMsg: "Book not found",
      });
    }
    req.book = book;
    next();
  });
};

// Create book
exports.createBook = (req, res) => {
  // console.log( "from 52", req.body)
  const { user, title, description, bookLink } = req.body;
  const newBook = Book({
    user,
    title,
    description,
    bookLink,
  });



  newBook.save((err, book) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.status(200).json(book);
  });
};

// read all books
exports.allBooks = (req, res) => {
  Book.find()
    .populate("user likes.user comments.user")
    .sort({ createdAt: -1 })
    .exec((err, books) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(books);
  });
};

//Read a particular book
exports.getBook = (req, res) => {
  Book.find({ _id: req.book._id }).exec((err, book) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(book);
  });
};

// update book
exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(
    { _id: req.book._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, book) => {
      if (err || !book) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json(book);
    }
  );
};

// delete book
exports.deleteBook = (req, res) => {
  Book.findByIdAndRemove(
    { _id: req.book._id },
    { useFindAndModify: false, new: true },
    (err, book) => {
      if (err || !book) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json({ message: "Book has been removed" });
    }
  );
};


// Like book
exports.likeBook = (req, res) => {
  Book.findByIdAndUpdate(
    { _id: req.book._id },
    {
      $push: { likes: req.profile._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("user likes.user")
    .exec((err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      result.user.salt = undefined
      result.user.encryptedpassword = undefined
      res.status(200).json(result)
    })
}

// Unlike book
exports.unlikeBook = (req, res) => {
  Book.findByIdAndUpdate(
    { _id: req.book._id },
    {
      $pull: { likes: req.profile._id },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("user likes.user")
    .exec((err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      result.user.salt = undefined
      result.user.encryptedpassword = undefined

      res.status(200).json(result)
    })
}

// comment on a book
exports.commentBook = (req, res) => {
  Book.findByIdAndUpdate(
    { _id: req.book._id },
    {
      $push: {
        comments: { user: req.profile._id, text: req.body.text },
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .populate("user comments.user")
    .exec((err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ errorMsg: "An error occured, try again later" })
      }
      result.user.salt = undefined
      result.user.encryptedpassword = undefined

      res.status(200).json(result)
    })
}