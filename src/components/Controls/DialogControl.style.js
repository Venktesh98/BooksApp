import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    "& .MuiDialog-paper": {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
  },
}));
