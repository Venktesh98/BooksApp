import { Snackbar } from "@material-ui/core";
import React from "react";
import { Alert } from "@material-ui/lab";
import { useStyles } from "./NotificationControl.style";

export default function NotificationControl({ notify, setNotify }) {
  const handleClose = () => {
    setNotify({
      isOpen: false,
    });
  };

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={notify.type}>
          {notify.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
