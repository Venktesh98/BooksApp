import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonControl from "../Controls/ButtonControl";
import DialogControl from "../Controls/DialogControl";
import InputControl from "../Controls/InputControl";
import { getSingleBook } from "../Services/useAxios";
import { Form, useForm } from "../Services/useForm";
import { useStyles } from "./BookForm.style";

const initialValues = {
  bookTitle: "",
  bookPrice: "",
  bookAuthor: "",
  bookGenre: "",
};

function BookForm({
  getBooks,
  onDialogToggle,
  onBookId,
  onSetBookId,
  openDialog,
  setOpenDialog,
  singleBookResponse,
}) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  // const [openDialog, setOpenDialog] = useState(false);

  const validate = (fieldValues = bookData) => {
    let validation = { ...errors }; // specifies that to exists all other error messages if we type in another input

    if ("bookTitle" in fieldValues) {
      validation.bookTitle = fieldValues.bookTitle
        ? fieldValues.bookTitle.length < 3
          ? "Must be 3 characters!"
          : ""
        : "This field is required";
    }
    if ("bookPrice" in fieldValues) {
      validation.bookPrice = fieldValues.bookPrice
        ? ""
        : "This field is required";
    }
    if ("bookAuthor" in fieldValues) {
      validation.bookAuthor = fieldValues.bookAuthor
        ? ""
        : "This field is required";
    }
    if ("bookGenre" in fieldValues) {
      validation.bookGenre = fieldValues.bookGenre
        ? ""
        : "This field is required";
    }

    // For setting up the errors messages
    setErrors({
      ...validation,
    });

    const returendValue = Object.values(validation).every(
      (vali) => vali === ""
    ); // returns either true or false
    return returendValue;
  };

  const [bookData, setBookData, handleInputChange] = useForm(
    initialValues,
    true,
    validate
  );

  // populating on the form i.e old values
  useEffect(() => {
    console.log("In get book useeefcct");
    (async () => {
      try {
        const response = await getSingleBook(onBookId);
        setBookData(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    })();

    // axios
    //   .get(`http://localhost:5000/books/retreivebookbyid/${onBookId}`)
    //   .then((response) => {
    //     console.log("Single Book Response:", response);
    //     setBookData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
    // setBookData(singleBookResponse);
  }, [singleBookResponse]);

  const bookDetails = {
    bookTitle: bookData?.bookTitle,
    bookPrice: bookData?.bookPrice,
    bookAuthor: bookData?.bookAuthor,
    bookGenre: bookData?.bookGenre,
  };

  const handleResetForm = () => {
    console.log("In handle Reset Form:");
    setBookData({ ...initialValues });
    setErrors({});
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      // For Put Request
      if (onBookId) {
        console.log("PUT REquest");
        axios
          .put(
            `http://localhost:5000/books/updatebook/${onBookId}`,
            bookDetails
          )
          .then((response) => {
            console.log("Put response:", response);
            getBooks();
          })
          .catch((error) => {
            console.log("Error Put:", error);
          });
        onSetBookId("");
        handleResetForm();
      }
      // For Post Request
      else {
        console.log("POst Request");
        axios
          .post("http://localhost:5000/books/addbook", bookDetails)
          .then((response) => {
            console.log("Response Book Post:", response);
            getBooks();
          })
          .catch((error) => {
            console.log("Error:", error);
          });
        handleResetForm();
      }
      onDialogToggle();
    }
  };

  console.log("singleBookResponse:", singleBookResponse);
  return (
    <div>
      <DialogControl
        title="Add Book Details"
        openPopUp={openDialog}
        setOpenPopup={setOpenDialog}
        handleResetForm={handleResetForm}
        setErrors={setErrors}
        onCloseDialog={() => {
          setOpenDialog(false);
          handleResetForm();
        }}
      >
        <Form onSubmit={handleFormSubmit}>
          <div className={classes.formContent}>
            <InputControl
              label="Title"
              name="bookTitle"
              onChange={handleInputChange}
              value={bookData.bookTitle}
              error={errors?.bookTitle}
              autoFocus
            />
            <InputControl
              label="Price"
              name="bookPrice"
              onChange={handleInputChange}
              value={bookData.bookPrice}
              error={errors?.bookPrice}
            />
            <InputControl
              label="Author"
              name="bookAuthor"
              onChange={handleInputChange}
              value={bookData.bookAuthor}
              error={errors?.bookAuthor}
            />
            <InputControl
              label="Genre"
              name="bookGenre"
              onChange={handleInputChange}
              value={bookData.bookGenre}
              error={errors?.bookGenre}
            />

            <ButtonControl
              className={classes.buttonControl}
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              text="Submit"
            />
          </div>
        </Form>
      </DialogControl>
    </div>
  );
}

export default BookForm;
