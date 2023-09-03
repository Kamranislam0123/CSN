import { JOBS_CREATE, JOBS_ERROR, JOBS_GET_ALL, JOBS_LOADING, JOBS_SUCCESS } from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case JOBS_CREATE:
      return {
        ...state,
        success: action.payload,
        loading: false,
        error: "",
      }
    case JOBS_LOADING:
      return {
        ...state,
        error: "",
        success: "",
        loading: action.payload,
      }
    case JOBS_GET_ALL:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: "",
        success: ""
      }
    case JOBS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: ""
      }
    case JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: "",
      }
    default:
      return state
  }
}
