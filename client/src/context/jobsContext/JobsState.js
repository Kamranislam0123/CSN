import React, { useReducer } from "react"
import { JobsContext } from "./JobsContext"
import JobsReducer from "./JobsReducer"
import axios from "axios"
import { API } from "../../utils/proxy"
import { JOBS_ERROR, JOBS_GET_ALL, JOBS_LOADING, JOBS_CREATE, JOBS_SUCCESS } from "../types"

export const JobsState = ({ children }) => {
  const initialState = {
    jobs: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(JobsReducer, initialState)

  const getAllJobs = async () => {
    try {
      dispatch({
        type: JOBS_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/jobs`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log(response)
      if (response.status === 200) {
        dispatch({
          type: JOBS_GET_ALL,
          payload: response.data,
        })
      }
    } catch (error) {
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const createJob = async (userId, jobData) => {
    // console.log("from 43 ", jobData, userId);
    try {
      dispatch({
        type: JOBS_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/job/${userId}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: JOBS_CREATE,
          payload: "Successfully created!",
        })
        getAllJobs()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const deleteJob = async (userID, jobId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/job/${userID}/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: JOBS_SUCCESS,
          payload: response.data.message,
        })
        getAllJobs()
      }
    } catch (error) {
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const likeJobs = async (jobId, userId) => {
    await axios.put(
      `${API}/job/like/${userId}/${jobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      }
    )
    try {
    } catch (error) {
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const unLikeJob = async (jobId, userId) => {
    try {
      await axios.put(
        `${API}/job/unlike/${userId}/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
    } catch (error) {
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const addComment = async (jobId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/job/comment/${userId}/${jobId}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        getAllJobs()
      }
    } catch (error) {
      dispatch({
        type: JOBS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <JobsContext.Provider
      value={{
        jobs: state.jobs,
        error: state.error,
        loading: state.loading,
        success: state.success,
        getAllJobs,
        createJob,
        deleteJob,
        likeJobs,
        unLikeJob,
        addComment,
      }}
    >
      {children}
    </JobsContext.Provider>
  )
}
