import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./DialogControl.style";

export default function DialogControl({
  title,
  children,
  openPopUp,
  setOpenPopup,
  onCloseDialog,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={openPopUp}
        fullWidth={true}
        maxWidth={"sm"}
        className={classes.dialogWrapper}
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
              onClick={() => setOpenPopup(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
