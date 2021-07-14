import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  main: {
    // default classname of the form
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const useForm = (
  initialValues,
  validationOnChange = false,
  validate
) => {
  const [bookData, setBookData] = useState(initialValues);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: value,
    });

    // Displaying the particular input error message
    if (validationOnChange) {
      validate({ [name]: value });
    }
  };

  return [bookData, setBookData, handleInputChange];
};

export const Form = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <form className={classes.main} {...rest}>
      <div>{children}</div>
    </form>
  );
};
