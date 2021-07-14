import { Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ButtonControl from "../Controls/ButtonControl";
import DialogControl from "../Controls/DialogControl";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./Book.style";
import BookForm from "./BookForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Paper } from "@material-ui/core";

function Book() {
  const classes = useStyles();
  const [bookResponse, setBookResponse] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  //  fetches the book
  const getBooks = () => {
    console.log("In Get Books in Book.js");
    axios
      .get("http://localhost:5000/books/retreivebooks")
      .then((response) => {
        console.log("Get Book Response:", response);
        setBookResponse(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  //  opens dialog for edit
  const openPopUpForEdit = (id) => {
    // localStorage.setItem("bookId", JSON.stringify(id));
    setOpenDialog(true);
    setBookId(id);
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

  return (
    <div>
      <DialogControl
        title="Add Book Details"
        openPopUp={openDialog}
        setOpenPopup={setOpenDialog}
        onCloseDialog={() => setOpenDialog(false)}
      >
        <BookForm
          getBooks={getBooks}
          onDialogToggle={handleOpenDialog}
          onBookId={bookId}
          onSetBookId={setBookId}
        />
      </DialogControl>

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

        <Paper className={classes.paper}>
          <DataTable
            title="Books App"
            columns={columns}
            data={bookResponse?.data}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default Book;
