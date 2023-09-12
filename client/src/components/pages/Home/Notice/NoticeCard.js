import {  Grid, Paper, Typography } from "@material-ui/core"
import CameraIcon from "@material-ui/icons/Camera"
import React from "react"
import { Carousel } from "react-bootstrap"

export const NoticeCard = ({post}) => {
  console.log(post)
  const filteredPosts = post?.filter(post => post.user._id === '64ff38ccbf3124479026b30d');
  console.log(filteredPosts)
  // const noticeContext = useContext(NoticeContext)
  // useEffect(() => {
  //   noticeContext.getNotices()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <div className="mt-3">
      <h6>
        <b>Updates</b>
      </h6>
      <Paper variant="elevation" elevation={3}>
        <Carousel>
          {filteredPosts?.length > 0 ? (
          filteredPosts.map((not, index) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={not.picture.length ? `/${not.picture[0]}` : "https://via.placeholder.com/800x400"} alt={not.picture[0]}
                    style={{ height: '300px', filter: 'brightness(50%)',  }}
                  />
                  <Carousel.Caption>
                    <h3>Notice: {index + 1}</h3>
                    <Typography variant="body1" style={{color: "#03dac6"}} component="p">
                        {not.content}
                      </Typography>
                  </Carousel.Caption>
                          </Carousel.Item>
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
                        <CameraIcon fontSize="large" />
                        <h6 className="mt-2">No Notice out there</h6>
                      </Grid>
                    </div>
                  )}
        </Carousel>
      </Paper>
    </div>
  )
}