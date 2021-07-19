import {
  Dialog,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { useStyles } from "./DeleteDialogControl.style";

export default function DeleteDialogControl({
  title,
  openPopupDialog,
  onCloseDialog,
  onSetBookIdForDelete,
  deleteItemFromList,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={openPopupDialog}
        // fullWidth={true}
        // maxWidth={"xs"}
        classes={{ paper: classes.dialog }}
        onClose={onCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
          </div>
        </DialogTitle>
        {/* <DialogContent dividers>{children}</DialogContent> */}
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onCloseDialog} color="secondary" variant="contained">
            No
          </Button>
          <Button
            onClick={() => {
              onCloseDialog();
              deleteItemFromList(onSetBookIdForDelete);
            }}
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
