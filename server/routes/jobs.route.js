const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");
const {
  getJobById,
  createJob,
  allJobs,
  getJob,
  updateJob,
  deleteJob,
  likeJob,
  unlikeJob,
  commentJob,
} = require("../controllers/jobs.controller");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

// param
router.param("userId", getUserById);
router.param("jobId", getJobById);

// create job
router.post("/create/job/:userId", isSignedIn, isAuthenticated, createJob);

// Like a job
router.put("/job/like/:userId/:jobId", isSignedIn, isAuthenticated, likeJob)

// Unlike a job
router.put(
  "/job/unlike/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  unlikeJob
)
// comment a job
router.put(
  "/job/comment/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  commentJob
)

// read all jobs
router.get("/jobs", isSignedIn, allJobs);

//read a particular job
router.get("/jobs/:jobId", isSignedIn, getJob);

// update job
router.put(
  "/update/job/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  updateJob
);

// delete job
router.delete(
  "/delete/job/:userId/:jobId",
  isSignedIn,
  isAuthenticated,
  deleteJob
);
module.exports = router;
