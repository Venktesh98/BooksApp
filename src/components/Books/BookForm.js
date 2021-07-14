import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonControl from "../Controls/ButtonControl";
import InputControl from "../Controls/InputControl";
import { Form, useForm } from "../Services/useForm";
import { useStyles } from "./BookForm.style";

const initialValues = {
  bookTitle: "",
  bookPrice: "",
  bookAuthor: "",
  bookGenre: "",
};

function BookForm({ getBooks, onDialogToggle, onBookId, onSetBookId }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = bookData) => {
    let validation = { ...errors }; // specifies that to exists all other error messages if we type in another input

    if ("bookTitle" in fieldValues) {
      validation.bookTitle = fieldValues.bookTitle
        ? ""
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
  // const bookId = JSON.parse(localStorage.getItem("bookId"));

  // populating on the form i.e old values
  useEffect(() => {
    console.log("In get book useeefcct");
    axios
      .get(`http://localhost:5000/books/retreivebookbyid/${onBookId}`)
      .then((response) => {
        console.log("Single Book Response:", response);
        setBookData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const bookDetails = {
    bookTitle: bookData?.bookTitle,
    bookPrice: bookData?.bookPrice,
    bookAuthor: bookData?.bookAuthor,
    bookGenre: bookData?.bookGenre,
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

        // localStorage.removeItem("bookId");
        onSetBookId("");
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
      }
      onDialogToggle();
    }
  };

  console.log("bookData:", bookData);
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <div className={classes.formContent}>
          <InputControl
            label="Title"
            name="bookTitle"
            onChange={handleInputChange}
            value={bookData.bookTitle}
            error={errors.bookTitle}
          />
          <InputControl
            label="Price"
            name="bookPrice"
            onChange={handleInputChange}
            value={bookData.bookPrice}
            error={errors.bookPrice}
          />
          <InputControl
            label="Author"
            name="bookAuthor"
            onChange={handleInputChange}
            value={bookData.bookAuthor}
            error={errors.bookAuthor}
          />
          <InputControl
            label="Genre"
            name="bookGenre"
            onChange={handleInputChange}
            value={bookData.bookGenre}
            error={errors.bookGenre}
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
    </div>
  );
}

export default BookForm;
