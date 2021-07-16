import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonControl from "../Controls/ButtonControl";
import DialogControl from "../Controls/DialogControl";
import InputControl from "../Controls/InputControl";
import { Form, useForm } from "../Services/useForm";
import { useStyles } from "./BookForm.style";

function BookForm({
  getBooks,
  onBookId,
  onSetBookId,
  openDialog,
  handleOpenDialog,
  singleBookResponse,
  initialValues,
  sendNotification,
}) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});

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
    setBookData(singleBookResponse);
  }, [singleBookResponse]);

  const bookDetails = {
    bookTitle: bookData?.bookTitle,
    bookPrice: bookData?.bookPrice,
    bookAuthor: bookData?.bookAuthor,
    bookGenre: bookData?.bookGenre,
  };

  const handleResetForm = () => {
    setBookData({ ...initialValues });
    setErrors({});
  };

  // submits the form data
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // For Put Request
      if (onBookId) {
        axios
          .put(
            `http://localhost:5000/books/updatebook/${onBookId}`,
            bookDetails
          )
          .then((response) => {
            getBooks();
          })
          .catch((error) => {
            console.log("Error Put:", error);
          });
        onSetBookId("");
        handleResetForm();
        sendNotification("Updated Successfully!", "info");
      }
      // For Post Request
      else {
        axios
          .post("http://localhost:5000/books/addbook", bookDetails)
          .then((response) => {
            getBooks();
          })
          .catch((error) => {
            console.log("Error:", error);
          });
        handleResetForm();
        sendNotification("Added Successfully!", "success"); // opens Snackbar
      }
      handleOpenDialog(); // toggles the Dialog
    }
  };

  return (
    <div>
      <DialogControl
        title="Add Book Details"
        openPopUp={openDialog}
        handleResetForm={handleResetForm}
        setErrors={setErrors}
        onCloseDialog={() => {
          handleOpenDialog();
          handleResetForm();
        }}
      >
        <Form onSubmit={handleFormSubmit}>
          <div className={classes.formContent}>
            <InputControl
              label="Title"
              name="bookTitle"
              onChange={handleInputChange}
              value={bookData?.bookTitle}
              error={errors?.bookTitle}
              autoFocus
            />
            <InputControl
              label="Price"
              name="bookPrice"
              onChange={handleInputChange}
              value={bookData?.bookPrice}
              error={errors?.bookPrice}
            />
            <InputControl
              label="Author"
              name="bookAuthor"
              onChange={handleInputChange}
              value={bookData?.bookAuthor}
              error={errors?.bookAuthor}
            />
            <InputControl
              label="Genre"
              name="bookGenre"
              onChange={handleInputChange}
              value={bookData?.bookGenre}
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
