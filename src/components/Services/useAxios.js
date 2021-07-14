import axios from "axios";

export const getSingleBook = (onBookId) => {
  const response = axios.get(
    `http://localhost:5000/books/retreivebookbyid/${onBookId}`
  );
  return response;
};
