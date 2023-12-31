const Job = require("../models/Jobs");
const path = require("path");

exports.getJobById = (req, res, next, Id) => {
  Job.findById(Id).exec((err, job) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    if (!job) {
      return res.status(400).json({
        errorMsg: "Job not found",
      });
    }
    req.job = job;
    next();
  });
};

// Create job
// exports.createJob = (req, res) => {
//   const { user, work, company, abtWork, date } = req.body;

//   const newJob = Job({
//     user,
//     work,
//     company,
//     abtWork,
//     date,
//   });

//   newJob.save((err, job) => {
//     if (err) {
//       res.status(400).json({
//         errorMsg: "An error occured",
//       });
//     }
//     return res.status(200).json(job);
//   });
// };
  // const newJob = Job({
  //   user,
  //   work,
  //   company,
  //   abtWork,
  //   date,
  // });

// Create job
exports.createJob = (req, res) => {
  // console.log( "from 52", req.body)
  const { user, title, type, description, responsibilities } = req.body;
  const newJob = Job({
    user,
    title,
    type,
    description,
    responsibilities,
  });



  newJob.save((err, job) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.status(200).json(job);
  });
};

// read all jobs
exports.allJobs = (req, res) => {
  Job.find()
    .populate("user likes.user comments.user")
    .sort({ createdAt: -1 })
    .exec((err, jobs) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(jobs);
  });
};

//Read a particular job
exports.getJob = (req, res) => {
  Job.find({ _id: req.job._id }).exec((err, job) => {
    if (err) {
      res.status(400).json({
        errorMsg: "An error occured",
      });
    }
    return res.json(job);
  });
};

// update job
exports.updateJob = (req, res) => {
  Job.findByIdAndUpdate(
    { _id: req.job._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, job) => {
      if (err || !job) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json(job);
    }
  );
};

// delete job
exports.deleteJob = (req, res) => {
  Job.findByIdAndRemove(
    { _id: req.job._id },
    { useFindAndModify: false, new: true },
    (err, job) => {
      if (err || !job) {
        return res.status(400).json({
          error: "An error occured,  try again later",
        });
      }
      return res.status(200).json({ message: "Job has been removed" });
    }
  );
};


// Like job
exports.likeJob = (req, res) => {
  Job.findByIdAndUpdate(
    { _id: req.job._id },
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

// Unlike job
exports.unlikeJob = (req, res) => {
  Job.findByIdAndUpdate(
    { _id: req.job._id },
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

// comment on a job
exports.commentJob = (req, res) => {
  Job.findByIdAndUpdate(
    { _id: req.job._id },
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