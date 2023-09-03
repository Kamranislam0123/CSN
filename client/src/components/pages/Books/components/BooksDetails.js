import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { BookModal } from "../../Modals/BookModal"
import { BooksContext } from "../../../../context/booksContext/BooksContext"
import { LoadingBook } from "./LoadingBook"
import { BooksCard } from "./BooksCard"
// import { FriendCard } from "./FriendCard"
// import { FriendsLoading } from "./FriendsLoading"

export const BooksDetails = () => {
  const userContext = useContext(UserContext)
  const booksContext = useContext(BooksContext)

  const [showBook, setShowBook] = useState(false);

  const handleModalBook = () => {
    setShowBook(!showBook)
  }
  
  useEffect(() => {
    booksContext.getAllBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="friends-tab">
      {showBook && (
        <BookModal
          modalTitle="Post a book"
          show={showBook}
          bookFunction={booksContext.createBook}
          book={undefined}
          handleModal={handleModalBook}
        />
      )}
      <Paper variant="outlined" className="py-3">
        <Container>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                <b>Books</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={1}
                justify="flex-end"
                alignItems="flex-end"
              >
                <Button
                fullWidth
                onClick={handleModalBook}
                color="primary"
                style={{ fontWeight: "bold" }}
              >
                Add a book
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <div className="px-2">
            {booksContext.loading || userContext.loading ? (
              <LoadingBook />
            ) : booksContext.books.length > 0 ? (
              booksContext.books.map((book) => {
                // console.log(book)
                return (
                  <div key={book._id}>
                    <BooksCard book={book} />
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
                  <h6 className="mt-2">No books out there</h6>
                </Grid>
              </div>
            )}
          </div>
        </Container>
      </Paper>
    </div>
  )
}
