import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
// import { useStyles } from "./DialogControl.style";

export default function DeleteDialogControl({
  title,
  children,
  openPopupDialog,
  onCloseDialog,
  onSetBookIdForDelete,
  deleteItemFromList,
}) {
  //   const classes = useStyles();
  return (
    <div>
      <Dialog
        open={openPopupDialog}
        fullWidth={true}
        maxWidth={"sm"}
        // className={classes.dialogWrapper}
        onClose={onCloseDialog}
      >
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <CloseIcon
              style={{ color: "black", cursor: "pointer" }}
              onClick={onCloseDialog}
            />
          </div>
        </DialogTitle>
        {/* <DialogContent dividers>{children}</DialogContent> */}
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCloseDialog();
              deleteItemFromList(onSetBookIdForDelete);
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
