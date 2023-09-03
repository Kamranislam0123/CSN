import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardActions,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faComment,
  faHeart as faHeartRegualar,
  faShareSquare,
  faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons"
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"

import React, { useContext, useEffect, useState } from "react"
import Moment from "react-moment"
import { useHistory } from "react-router-dom"
import { AdsContext } from "../../../../context/adsContext/AdsContext"
import { AuthContext } from "../../../../context/authContext/authContext"
import { UserContext } from "../../../../context/userContext/UserContext"
import { JobsContext } from "../../../../context/jobsContext/JobsContext"
import { API } from "../../../../utils/proxy"
import { AdsModal } from "../../Modals/AdsModal"

export const JobsCard = ({ job }) => {
//   console.log(job)
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  const jobsContext = useContext(JobsContext)
  const [comment, setComment] = useState("")
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(job.likes.length)
  const [moreOption, setMoreOption] = useState(null)
  const [sendBtnColor, setSendBtnColor] = useState("grey")

  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }

  useEffect(() => {
    // post.likes.filter((like) => {
    //   if (like === authContext.user._id) {
    //     setLikeStatus(true)
    //   } else {
    //     setLikeStatus(false)
    //   }
    if (job.likes.includes(authContext.user._id)) {
      setLikeStatus(true)
    } else {
      setLikeStatus(false)
    }
  }, [authContext.user._id, job.likes])
  
  const handleLikeBtn = () => {
    if (!likeStatus) {
      jobsContext.likeJobs(job._id, authContext.user._id)
      setLikeCount(likeCount + 1)
      setLikeStatus(true)
    } else {
      jobsContext.unLikeJob(job._id, authContext.user._id)
      setLikeCount(likeCount - 1)
      setLikeStatus(false)
    }
  }
    const handleCommentSend = async () => {
    await jobsContext.addComment(job._id, authContext.user._id, comment)
        
    }
//   const [showAds, setShowAds] = useState(false)

//   const handleModalAds = () => {
//     handleClose()
//     setShowAds(!showAds)
//   }
  return (
    <Card variant="elevation" elevation={3} className="mb-3">
      {/* {showAds && (
        <AdsModal
          show={showAds}
          handleModal={handleModalAds}
          postFunction={adsContext.updatePost}
          modalTitle="Update post"
          post={ads}
        />
      )} */}
      <CardHeader
        avatar={
          <Avatar alt={job.user.name} src={`${API}/pic/user/${job.user._id}`} />
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMoreOption}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={moreOption}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {authContext.user._id === job.user._id ? (
                // <MenuItem onClick={handleModalAds}>Edit</MenuItem>
                <MenuItem>Edit</MenuItem>
              ) : null}
              {authContext.user._id === job.user._id ? (
                <MenuItem
                  onClick={() => {
                    jobsContext.deleteJob(authContext.user._id, job._id)
                    handleClose()
                  }}
                >
                  Delete
                </MenuItem>
              ) : null}
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={handleClose}>Bookmark</MenuItem>

              <MenuItem onClick={handleClose}>Report Post</MenuItem>
            </Menu>
          </>
        }
        title={
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/profile/${job.user._id}`)
            }}
          >
            {job.user.name}
          </b>
        }
        subheader={<Moment fromNow>{job.createdAt}</Moment>}
      />
      <CardContent className="py-1">
        <Typography variant="body1" component="p">
          <strong>Title: </strong> {job.title}
        </Typography>
        <Typography variant="body1" component="p">
          <strong>Type: </strong>{job.description}
        </Typography>
        <Typography variant="subtitle1" component="p">
          <strong>Description: <br /></strong>
          {job.description}
        </Typography>
        <Typography variant="subtitle1" component="p">
          <strong>Responsibilities: </strong> {job.description}
        </Typography>
          </CardContent>
          
        <CardActions disableSpacing className="my-0 py-0">
        <Grid container justify="space-between">
          <Grid item>
            <IconButton onClick={handleLikeBtn}>
              {likeStatus ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  style={{ color: "#ed4c56" }}
                />
              ) : (
                <FontAwesomeIcon icon={faHeartRegualar} />
              )}
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faComment} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Accordion variant="elevation">
        <AccordionSummary>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                variant="subtitle2"
                gutterBottom
              >
                {`Liked by ${likeCount}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">{`View all ${job.comments.length} comments`}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item>
              {job.comments.map((comment) => {
                return (
                  <span style={{ display: "flex" }} key={comment._id}>
                    <Typography variant="body2" className="pr-3">
                      <b>{comment.user.name}</b>
                    </Typography>
                    <Typography variant="subtitle2">{comment.text}</Typography>
                  </span>
                )
              })}
            </Grid>
            <Grid item>
              <FormControl fullWidth size="small">
                <InputLabel>Add a comment...</InputLabel>
                <Input
                  value={comment}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSendBtnColor("grey")
                      console.log(e.target.value)
                    } else {
                      setSendBtnColor("white")
                      console.log(e.target.value)
                    }
                    setComment(e.target.value)
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton type="submit" onClick={handleCommentSend}>
                        <FontAwesomeIcon
                          color={sendBtnColor}
                          size="sm"
                          icon={faPaperPlane}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
