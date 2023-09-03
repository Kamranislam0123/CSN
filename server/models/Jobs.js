const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema(
  {
    objType: {
      type: String,
      default: "jobs",
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
    type: {
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
    responsibilities: {
      type: String,
      required: true,
      trim: true,
      max: 500,
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

    // work: {
    //   workTitle: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     max: 50,
    //   },

    //   workType: {
    //     type: String,
    //     required: true,
    //   },

    //   workLocation: {
    //     type: String,
    //     required: true,
    //   },

    //   workDuration: {
    //     type: String,
    //   },

    //   openings: {
    //     type: Number,
    //   },

    //   salary: {
    //     type: String,
    //   },
    // },

    // company: {
    //   companyName: {
    //     type: String,
    //     required: true,
    //   },
    //   abtCompany: {
    //     type: String,
    //     max: 3000,
    //     required: true,
    //   },
    // },

    // abtWork: {
    //   workDesc: {
    //     type: String,
    //     max: 3000,
    //     required: true,
    //   },

    //   skillsReq: [
    //     {
    //       type: String,
    //       required: true,
    //     },
    //   ],
    // },

    // date: {
    //   startDate: {
    //     type: String,
    //     required: true,
    //   },

    //   applyBy: {
    //     type: String,
    //     required: true,
    //   },
    // },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Job", JobSchema)
