import React, { useContext, useEffect, useState } from "react"
// import { NoticeContext } from "../../../../context/noticeContext/NoticeContext"
import { PostContext } from "../../../../context/postContext/postContext"
import { UserContext } from "../../../../context/userContext/UserContext"
import { Home } from "../../../common/Base/Home"
import { LoadingPost } from "../Post/LoadingPost"
import { NoticeCard } from "./NoticeCard"

export const Notice = () => {
  // const noticeContext = useContext(NoticeContext)
  // useEffect(() => {
  //   noticeContext.getNotices()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
const postContext = useContext(PostContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    postContext.getAllPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log(notice)

  return (
    <Home>
      <div className="px-2">
        {postContext.loading || userContext.loading ? (
          <div>loading...</div>
        ) : (
              <div>
                <NoticeCard post={postContext.post} />
              </div>
        )}
      </div>
      {/* <div>
        {noticeContext.loading ? (
          <div>loading</div>
        ) : (
          noticeContext.notice.map((not, index) => {
            return (
              <Card elevation={1} className="mb-3">
                <CardContent>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography color="textSecondary" variant="caption">
                        Notice no.{index + 100}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {new Date(not.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="primary">{not.title}</Typography>
                  <Typography variant="body1">{not.description}</Typography>
                </CardContent>
                <CardActions className="pt-0 px-3">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      window.open(`${not.link}`)
                    }}
                  >
                    Link
                  </Button>
                </CardActions>
              </Card>
            )
          })
        )}
      </div> */}
    </Home>
  )
}
