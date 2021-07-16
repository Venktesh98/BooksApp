import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ButtonControl from "../Controls/ButtonControl";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./Book.style";
import BookForm from "./BookForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Paper } from "@material-ui/core";
import { getSingleBook } from "../Services/useAxios";
import Error from "../Pages/Error";
import { CircularProgress } from "@material-ui/core";
import NotificationControl from "../Controls/NotificationControl";
import DeleteDialogControl from "../Controls/DeleteDialogControl";

const initialValues = {
  bookTitle: "",
  bookPrice: "",
  bookAuthor: "",
  bookGenre: "",
};

function Book() {
  const classes = useStyles();
  const [bookResponse, setBookResponse] = useState("");
  const [singleBookResponse, setSingleBookResponse] = useState(initialValues);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookId, setBookId] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setLoading(true); // enables loading
    setTimeout(() => {
      getBooks();
    }, 500);
    return () => clearInterval();
  }, []);

  //  fetches the book
  const getBooks = () => {
    // setLoading(true);
    axios
      .get("http://localhost:5000/books/retreivebooks")
      .then((response) => {
        setBookResponse(response);
        setLoading(false); //loading state
      })
      .catch((error) => {
        console.log("Error:", error);
        setStatusCode(error.response.status);
        setLoading(false);
      });
  };

  //   fetch book by id
  const fetchSingleBook = async (id) => {
    try {
      const response = await getSingleBook(id);
      setSingleBookResponse(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // opens Dialog
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  //  opens dialog for edit
  const openPopUpForEdit = (id) => {
    setBookId(id);
    fetchSingleBook(id);
    handleOpenDialog();
  };

  // opens the Dialog for Delete
  const openDialogForDelete = () => {
    setDeleteDialog(!deleteDialog);
  };

  //  Deletes the data
  const handleDelete = (bookId) => {
    setBookId(bookId);
    openDialogForDelete();
  };

  const deleteItemFromList = (deleteBookId) => {
    if (deleteBookId) {
      axios
        .delete(`http://localhost:5000/books/deletebook/${bookId}`)
        .then((response) => {
          sendNotification("Deleted Successfully!", "error");
          getBooks();
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  // send the notification
  const sendNotification = (message, type) => {
    // opens the Snackbar
    setNotify({
      isOpen: true,
      message: message,
      type: type,
    });
  };

  const columns = [
    {
      name: "Title",
      selector: "bookTitle",
      sortable: true,
    },
    {
      name: "Price",
      selector: "bookPrice",
    },
    {
      name: "Author",
      selector: "bookAuthor",
    },
    {
      name: "Genre",
      selector: "bookGenre",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <EditOutlinedIcon
            color="primary"
            onClick={() => openPopUpForEdit(row._id)}
          />
          <DeleteOutlineIcon
            color="secondary"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  return statusCode == 400 ? (
    <Error />
  ) : (
    <div>
      {deleteDialog && (
        <DeleteDialogControl
          title="Are You Sure?"
          openPopupDialog={deleteDialog}
          onCloseDialog={openDialogForDelete}
          onSetBookIdForDelete={bookId}
          deleteItemFromList={deleteItemFromList}
        />
      )}

      <BookForm
        getBooks={getBooks}
        onBookId={bookId}
        onSetBookId={setBookId}
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        singleBookResponse={singleBookResponse}
        initialValues={initialValues}
        sendNotification={sendNotification}
      />

      {/* React-Data-Table */}
      <Container className={classes.container}>
        <ButtonControl
          style={{ marginTop: "1rem" }}
          text="Add New"
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClickData={handleOpenDialog}
        />

        {loading ? (
          <div className={classes.loader}>
            <CircularProgress color="default" />
          </div>
        ) : (
          <Paper className={classes.paper} elevation={2}>
            <DataTable
              title="BooksApp"
              columns={columns}
              pagination={true}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10]}
              paginationIconFirstPage
              paginationIconLastPage
              noDataComponent
              highlightOnHover={true}
              pointerOnHover={true}
              data={bookResponse?.data}
            />
          </Paper>
        )}
      </Container>

      {/* Notification Control */}
      <NotificationControl notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Book;
