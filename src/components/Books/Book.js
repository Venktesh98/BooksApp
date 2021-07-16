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
  const [dataTable, setDataTable] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setLoading(true); // enables loading
    setDataTable(false); //disables rendering the datatable untill loading stops
    setTimeout(() => {
      getBooks();
    }, 500);
    return () => clearInterval();
  }, []);

  //  fetches the book
  const getBooks = () => {
    console.log("In Get Books in Book.js");
    axios
      .get("http://localhost:5000/books/retreivebooks")
      .then((response) => {
        console.log("Get Book Response:", response);
        setBookResponse(response);
        setLoading(false); //loading state
        setDataTable(true); // sets Datatable to show
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
    console.log("openPopUpForEdit");
    setBookId(id);
    fetchSingleBook(id);
    setOpenDialog(true);
  };

  //  Deletes the data
  const handleDelete = (bookId) => {
    console.log("In handle Delete", bookId);
    axios
      .delete(`http://localhost:5000/books/deletebook/${bookId}`)
      .then((response) => {
        console.log("Deleet:response:", response);
        getBooks();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    sendNotification("Deleted Successfully!", "error");
  };

  const sendNotification = (message, type) => {
    // opens the Snackbar
    setNotify({
      isOpen: true,
      message: message,
      type: type,
    });
  };

  console.log("Book Resposne:", bookResponse);

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
          <EditOutlinedIcon onClick={() => openPopUpForEdit(row._id)} />
          <DeleteOutlineIcon onClick={() => handleDelete(row._id)} />
        </div>
      ),
    },
  ];

  return statusCode == 400 ? (
    <Error />
  ) : (
    <div>
      <BookForm
        getBooks={getBooks}
        onBookId={bookId}
        onSetBookId={setBookId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onDialogToggle={handleOpenDialog}
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
        ) : null}

        <Paper className={classes.paper}>
          {dataTable && (
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
          )}
        </Paper>
      </Container>

      {/* Notification Control */}
      <NotificationControl notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Book;
