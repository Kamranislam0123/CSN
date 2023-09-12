import React, { useContext, useEffect } from "react"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import { JobsContext } from "../../../../context/jobsContext/JobsContext"
import { UserContext } from "../../../../context/userContext/UserContext"
import { Home } from "../../../common/Base/Home"
import { LoadingJobs } from "./LoadingJobs"
import { JobsCard } from "./JobsCard"

export const JobsAndPlacements = () => {
  const jobsContext = useContext(JobsContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    jobsContext.getAllJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {jobsContext.loading || userContext.loading ? (
          <LoadingJobs />
        ) : jobsContext.jobs.length > 0 ? (
          jobsContext.jobs.map((job) => {
            // console.log(job)
            return (
              <div key={job._id}>
                <JobsCard job={job} />
              </div>
            )
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
              <h6 className="mt-2">No jobs out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
