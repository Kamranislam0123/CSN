import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"

export const JobsModal = ({
  show,
  handleModal,
  modalTitle,
  jobsFunction,
  // jobs,
}) => {
  const authContext = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [responsibilities, setResponsibilities] = useState("")

  const jobData = {
    user: authContext.user._id,
    title,
    type,
    description,
    responsibilities,
  }
  const handleBtnSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(jobData);
      const response = await jobsFunction(authContext.user._id, jobData)
      console.log(response)
      handleModal()
    } catch (error) {
      console.log(error.response.data.errorMsg)
    }
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#121212", color: "whitesmoke" }
      : null
  const styleThemeMain =
    authContext.theme === "dark" ? { background: "rgb(0 0 0 / 88%)" } : null

  return (
    <Modal show={show} onHide={handleModal} centered style={styleThemeMain}>
      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styleTheme}>
        <form onSubmit={handleBtnSubmit}>
          <Grid container justify="space-between" direction="row">
            <Grid item container direction="column">
              <Grid item>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="Title"
                  size="small"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="Type"
                  size="small"
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <TextField
                  multiline
                  fullWidth
                  className="mb-3"
                  variant="outlined"
                  rows={4}
                  placeholder="Description"
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  multiline
                  fullWidth
                  className="mb-3"
                  variant="outlined"
                  rows={2}
                  placeholder="Responsibilities"
                  size="small"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
        <Button size="small" onClick={handleModal}>
          Discard
        </Button>
        <Button type="submit" size="small" onClick={handleBtnSubmit}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
