const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema(
  {
    objType: {
      type: String,
      default: "books",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      max: 50,
    },
    description: {
	    type: String,
		max: 3000,
		required: true,
    },
    bookLink: {
      type: String,
      required: true,
      trim: true,
      max: 50,
    },
    likes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: "User",
				},
				text: {
					type: String,
					required: true,
				},
			},
		],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Book", BookSchema)
